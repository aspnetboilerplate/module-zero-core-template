using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore.Query.Internal;
using NSubstitute;

namespace AbpCompanyName.AbpProjectName.Tests.UnitTests.FakeServices
{
    internal static class TestQueryableUtil
    {
        internal static IRepository<T> AsRepository<T>(this T item) where T : class, IEntity<int>
        {
            var items = item == null ? new List<T>() : new List<T> { item };
            return AsRepository(items);
        }

        internal static IRepository<T, TPrimaryKey> AsRepository<T, TPrimaryKey>(this T item) where T : class, IEntity<TPrimaryKey>
        {
            var items = item == null ? new List<T>() : new List<T> {item};
            return AsRepository<T, TPrimaryKey>(items);
        }

        internal static IRepository<T> AsRepository<T>(this List<T> items) where T : class, IEntity<int>
        {
            var repository = Substitute.For<IRepository<T>>();
            MockRepositoryMethods<T, int>(items, repository);
            return repository;
        }

        internal static IRepository<T, TPrimaryKey> AsRepository<T, TPrimaryKey>(this List<T> items) where T : class, IEntity<TPrimaryKey>
        {
            var repository = Substitute.For<IRepository<T, TPrimaryKey>>();
            MockRepositoryMethods(items, repository);
            return repository;
        }

        private static void MockRepositoryMethods<T, TPrimaryKey>(List<T> items, IRepository<T, TPrimaryKey> repository) where T : class, IEntity<TPrimaryKey>
        {
            repository.GetAll().Returns(items.AsAsyncQueryable());
            repository.GetAllIncluding(Arg.Any<Expression<Func<T, object>>[]>()).Returns(items.AsAsyncQueryable());
            repository.GetAllListAsync().Returns(items);
            repository.When(i => i.InsertAsync(Arg.Any<T>())).Do(i => items.Add(i.Arg<T>()));
            repository.FirstOrDefaultAsync(Arg.Any<Expression<Func<T, bool>>>())
                .Returns(callInfo => items.FirstOrDefault(callInfo.Arg<Expression<Func<T, bool>>>().Compile()));
            repository.GetAsync(Arg.Any<TPrimaryKey>())
                .Returns(callInfo => items.Single(item => item.Id.Equals(callInfo.Arg<TPrimaryKey>())));
            repository.When(i => i.DeleteAsync(Arg.Any<T>())).Do(i => items.Remove(i.Arg<T>()));
            repository.Count().Returns(callInfo => items.Count);
        }

        internal static IQueryable<T> AsAsyncQueryable<T>(this IEnumerable<T> items)
        {
            return new TestQueryable<T>(items);
        }
    }

    internal class TestQueryable<T> : IQueryable<T>, IAsyncEnumerable<T>
    {
        private readonly IQueryable<T> _queryable;
        private readonly TestAsyncQueryProvider<T> _provider;

        public TestQueryable(IEnumerable<T> items)
        {
            _queryable = items.AsQueryable();
            _provider = new TestAsyncQueryProvider<T>(_queryable.Provider);
        }

        public IEnumerator<T> GetEnumerator()
        {
            return _queryable.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public Expression Expression
        {
            get { return _queryable.Expression; }
        }

        public Type ElementType
        {
            get { return _queryable.ElementType; }
        }

        public IQueryProvider Provider
        {
            get { return _provider; }
        }

        IAsyncEnumerator<T> IAsyncEnumerable<T>.GetEnumerator()
        {
            return _queryable.ToAsyncEnumerable().GetEnumerator();
        }
    }

    internal class TestAsyncQueryProvider<TEntity> : IAsyncQueryProvider
    {
        private readonly IQueryProvider _inner;

        internal TestAsyncQueryProvider(IQueryProvider inner)
        {
            _inner = inner;
        }

        public IQueryable CreateQuery(Expression expression)
        {
            return new TestAsyncEnumerable<TEntity>(expression);
        }

        public IQueryable<TElement> CreateQuery<TElement>(Expression expression)
        {
            return new TestAsyncEnumerable<TElement>(expression);
        }

        public object Execute(Expression expression)
        {
            return _inner.Execute(expression);
        }

        public TResult Execute<TResult>(Expression expression)
        {
            return _inner.Execute<TResult>(expression);
        }

        public IAsyncEnumerable<TResult> ExecuteAsync<TResult>(Expression expression)
        {
            return new TestAsyncEnumerable<TResult>(expression);
        }

        public Task<TResult> ExecuteAsync<TResult>(Expression expression, CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute<TResult>(expression));
        }
    }

    internal class TestAsyncEnumerable<T> : EnumerableQuery<T>, IAsyncEnumerable<T>, IQueryable<T>
    {
        public TestAsyncEnumerable(IEnumerable<T> enumerable)
            : base(enumerable)
        { }

        public TestAsyncEnumerable(Expression expression)
            : base(expression)
        { }

        public IAsyncEnumerator<T> GetEnumerator()
        {
            return new TestAsyncEnumerator<T>(this.AsEnumerable().GetEnumerator());
        }

        IQueryProvider IQueryable.Provider
        {
            get { return new TestAsyncQueryProvider<T>(this); }
        }
    }

    internal class TestAsyncEnumerator<T> : IAsyncEnumerator<T>
    {
        private readonly IEnumerator<T> _inner;

        public TestAsyncEnumerator(IEnumerator<T> inner)
        {
            _inner = inner;
        }

        public void Dispose()
        {
            _inner.Dispose();
        }

        public T Current
        {
            get
            {
                return _inner.Current;
            }
        }

        public Task<bool> MoveNext(CancellationToken cancellationToken)
        {
            return Task.FromResult(_inner.MoveNext());
        }
    }
}
