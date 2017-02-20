using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;

namespace AbpCompanyName.AbpProjectName.EntityFramework.Repositories
{
    public abstract class AbpProjectNameRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<AbpProjectNameDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected AbpProjectNameRepositoryBase(IDbContextProvider<AbpProjectNameDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add common methods for all repositories
    }

    public abstract class AbpProjectNameRepositoryBase<TEntity> : AbpProjectNameRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected AbpProjectNameRepositoryBase(IDbContextProvider<AbpProjectNameDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)
    }
}
