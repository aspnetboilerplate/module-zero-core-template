using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Abp;
using Abp.UI;
using Abp.Runtime.Validation;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.ObjectMapping;

using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Users.Dto;

using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests
{
    public abstract class AbpProjectNameAsyncServiceTestBase<TEntity, TEntityDto, TPrimaryKey, TService, TCreateDto, TUpdateDto> 
        : AbpProjectNameTestBase
        where TService : AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, PagedResultRequestDto, TCreateDto, TUpdateDto>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : class, IEntityDto<TPrimaryKey>
        where TUpdateDto : class, IEntityDto<TPrimaryKey>
        where TPrimaryKey : IComparable
    {
        private readonly TService _appService;

        protected TService AppService
        {
            get
            {
                return _appService;
            }
        }

        protected AbpProjectNameAsyncServiceTestBase()
        {
            _appService = Resolve<TService>();
        }

        protected TPrimaryKey[] keys;

        protected async Task Create(int entityCount)
        {
            List<TPrimaryKey> ids = new List<TPrimaryKey>();
            for(int i = 0; i < entityCount; i++ )
            {
                TPrimaryKey id = await UsingDbContextAsync(async context => 
                {
                    TEntity entity = await CreateEntity(i);
                    context.Set<TEntity>().Add(entity);

                    context.SaveChanges();

                    return entity.Id;
                });

                ids.Add(id);
            }

            keys = ids.ToArray();
        } 
        
        protected abstract Task<TEntity> CreateEntity(int entityNumer);

        protected abstract TCreateDto  GetCreateDto();

        protected abstract TUpdateDto GetUpdateDto(TPrimaryKey key);

        protected async virtual Task<TUpdateDto> CheckForValidationErrors(Func<Task<TUpdateDto>> callBack)
        {
            try
            {
                return await callBack();
            }
            catch(AbpException ave)
            {
                if(ave is AbpValidationException)
                {
                    throw CreateShouldAssertException(ave as AbpValidationException);
                }

                throw new ShouldAssertException(ave.Message);
            }
        }

        protected async virtual Task<IEntityDto<TPrimaryKey>> CheckForValidationErrors( Func<Task<IEntityDto<TPrimaryKey>>> function )
        {
            try
            {
                return await function();
            }
            catch(AbpException ave)
            {
                if(ave is AbpValidationException)
                {
                    throw CreateShouldAssertException(ave as AbpValidationException);
                }

                throw new ShouldAssertException(ave.Message);
            }
        }

        private ShouldAssertException CreateShouldAssertException(AbpValidationException ave)
        {
            string message = "";
            foreach (var error in ave.ValidationErrors)
            {
                message += error.ErrorMessage + "\n";
            }

            return new ShouldAssertException(message);
        }

        [Fact]
        public async Task Create_Test()
        {
            //Arrange
            TCreateDto createDto = GetCreateDto();

            //Act
            TEntityDto createdEntityDto = await CheckForValidationErrors(async () =>
            {
                return await _appService.Create(createDto);
            }) as TEntityDto;

            //Assert
            await UsingDbContextAsync(async context =>
            {
                TEntity savedEntity = await context.Set<TEntity>().FirstOrDefaultAsync(e => e.Id.CompareTo(createdEntityDto.Id) == 0);
                savedEntity.ShouldNotBeNull();

                await CreateChecks(context, createDto);
            });
        }

        public async virtual Task CreateChecks(AbpProjectNameDbContext context, TCreateDto createDto)
        {
        }

        [Fact]
        public async Task Get_Test()
        {
            //Arrange
            await Create(1);

            //Act
            TEntityDto entity = await _appService.Get(new EntityDto<TPrimaryKey>(keys[0]));

            //Assert
            entity.ShouldNotBeNull();
        }

        [Fact]
        public virtual async Task GetAll_Test()
        {
            //Arrange
            await Create(20);

            //Act
            PagedResultDto<TEntityDto> users = await _appService.GetAll(
                new PagedResultRequestDto{MaxResultCount=10, SkipCount=0}
            );

            //Assert
            users.Items.Count.ShouldBe(10);
        }

        [Fact]
        public virtual async Task GetAll_Paging_Test()
        {
            //Arrange
            await Create(20);

            //Act
            PagedResultDto<TEntityDto> users = await _appService.GetAll(
                new PagedResultRequestDto{MaxResultCount=10, SkipCount=10}
            );

            //Assert
            users.Items.Count.ShouldBe(10);
        }

        [Fact]
        public async Task Update_Test()
        {
            //Arrange
            await Create(1);
                
            //
            TUpdateDto updateDto = GetUpdateDto(keys[0]);

            //Act
            //Assuming TUpdateDto is TEntityDto, otherwise atribute mapping is required 
            TEntityDto updatedEntityDto = await CheckForValidationErrors(async () => 
            {
                return await _appService.Update(
                    updateDto
                );
            }) as TEntityDto;

            // SaveChanges here so that the 
            // await _unitOfWorkManager.Current.SaveChangesAsync();

            //Assert, should check an updated field
            updatedEntityDto.ShouldNotBeNull();
            updatedEntityDto.Id.ShouldBe(keys[0]);

            await UsingDbContextAsync(async (context, updatedDto) =>
            {
                await UpdateChecks(context, updatedDto);
            }, updatedEntityDto);
        }

        //todo: add Async To methods
        public async virtual Task UpdateChecks(AbpProjectNameDbContext context, TEntityDto updatedDto)
        {
        }

        [Fact]
        public async Task Delete_Test()
        {
            //Arrange
            await Create(1);

            //Act
            await _appService.Delete(new EntityDto<TPrimaryKey>(keys[0]));

            //Assert
            await UsingDbContextAsync(async context =>
            {
                TEntity savedEntity = await context.Set<TEntity>().FirstOrDefaultAsync(e => e.Id.CompareTo(keys[0]) == 0);

                if (savedEntity is ISoftDelete)
                {
                    (savedEntity as ISoftDelete).IsDeleted.ShouldBeTrue();
                }
                else
                {
                    savedEntity.ShouldBeNull();
                }

                await DeleteChecks(context, keys[0]);
            });
        }

        public async virtual Task DeleteChecks(AbpProjectNameDbContext context, TPrimaryKey key)
        {
        }

        protected async Task UsingDbContextAsync(Func<AbpProjectNameDbContext, TEntityDto, Task> action, TEntityDto updateDto)
        {
            await UsingDbContextAsync(AbpSession.TenantId, action, updateDto);
        }

        protected async Task UsingDbContextAsync(int? tenantId, Func<AbpProjectNameDbContext, TEntityDto, Task> action, TEntityDto updateDto)
        {
            using (UsingTenantId(tenantId))
            {
                using (var context = LocalIocManager.Resolve<AbpProjectNameDbContext>())
                {
                    await action(context, updateDto);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}