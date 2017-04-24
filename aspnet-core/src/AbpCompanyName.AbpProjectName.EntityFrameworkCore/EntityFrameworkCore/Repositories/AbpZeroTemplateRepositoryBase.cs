using Abp.Domain.Entities;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore.Repositories
{
    /// <summary>
    /// Base class for custom repositories of the application.
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    /// <typeparam name="TPrimaryKey">Primary key type of the entity</typeparam>
    public abstract class AbpZeroTemplateRepositoryBase<TEntity, TPrimaryKey> : EfCoreRepositoryBase<AbpProjectNameDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected AbpZeroTemplateRepositoryBase(IDbContextProvider<AbpProjectNameDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add your common methods for all repositories
    }

    /// <summary>
    /// Base class for custom repositories of the application.
    /// This is a shortcut of <see cref="AbpZeroTemplateRepositoryBase{TEntity,TPrimaryKey}"/> for <see cref="int"/> primary key.
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    public abstract class AbpZeroTemplateRepositoryBase<TEntity> : AbpZeroTemplateRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected AbpZeroTemplateRepositoryBase(IDbContextProvider<AbpProjectNameDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)!!!
    }
}
