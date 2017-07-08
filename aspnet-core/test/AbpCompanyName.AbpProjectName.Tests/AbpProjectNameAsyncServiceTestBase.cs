using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.ObjectMapping;

using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;
using Abp.UI;
using Abp.Runtime.Validation;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.Tests
{
    public abstract class AbpProjectNameAsyncServiceTestBase<TEntity, TEntityDto, TPrimaryKey, TService, TCreateDto, TUpdateDto> 
        : AbpProjectNameTestBase
        where TService : AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, PagedResultRequestDto, TCreateDto, TUpdateDto>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TUpdateDto :  IEntityDto<TPrimaryKey>
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

        protected async Task create(int entityCount)
        {
            List<TPrimaryKey> ids = new List<TPrimaryKey>();
            for(int i = 0; i < entityCount; i++ )
            {
                TPrimaryKey id = await UsingDbContextAsync(async context => 
                {
                    TEntity entity = await createEntity(i);
                    context.Set<TEntity>().Add(entity);

                    context.SaveChanges();

                    return entity.Id;
                });

                ids.Add(id);
            }

            keys = ids.ToArray();
        } 

        protected abstract Task<TEntity> createEntity(int entityNumer);

        protected abstract TCreateDto  getCreateDto();

        protected async virtual Task<TEntityDto> checkForValidationErrors( Func<Task<TEntityDto>> function )
        {
            try
            {
                return await function();
            }
            catch(AbpValidationException ave)
            {
                string message = "";
                foreach (var error in ave.ValidationErrors)
                {
                    message += error.ErrorMessage + "\n";
                }

                throw new ShouldAssertException(message);
            }
        }

        [Fact]
        public async Task Create_Test()
        {
            //Arrange
            TCreateDto createDto = getCreateDto();

            //Act
            TEntityDto createdEntityDto = await checkForValidationErrors(async () => {
                    return await _appService.Create(createDto);
                }
            );

            //Assert
            await UsingDbContextAsync(async context =>
            {
                TEntity savedEntity = await context.Set<TEntity>().FirstOrDefaultAsync(e => e.Id.CompareTo(createdEntityDto.Id) == 0);
                savedEntity.ShouldNotBeNull();

                CreateChecks(context);
            });
        }

        public async virtual Task CreateChecks(AbpProjectNameDbContext context)
        {
        }

        [Fact]
        public async Task Get_Test()
        {
            //Arrange
            await create(1);

            //Act
            TEntityDto entity = await _appService.Get(new EntityDto<TPrimaryKey>(keys[0]));

            //Assert
            entity.ShouldNotBeNull();
        }

        [Fact]
        public virtual async Task GetAll_Test()
        {
            //Arrange
            await create(20);

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
            await create(20);

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
            await create(1);

            IObjectMapper objectMapper = this.LocalIocManager.Resolve<IObjectMapper>();

            //
            TUpdateDto updatedDto = objectMapper.Map<TUpdateDto>(await createEntity(2));
            updatedDto.Id = keys[0];

            //Act
            //Assuming TUpdateDto is TEntityDto, otherwise atribute mapping is required 
            TEntityDto entityDto = await checkForValidationErrors(async () => {
                return await _appService.Update(
                    updatedDto
                );
            });

            //Assert, should check an updated field
            entityDto.Id.ShouldBe(keys[0]);


            await UsingDbContextAsync(async context => {
                await UpdateChecks(context);
            });
        }

        public async virtual Task UpdateChecks(AbpProjectNameDbContext context)
        {
        }

        [Fact]
        public async Task Delete_Test()
        {
            //Arrange
            await create(1);

            //Act
            await _appService.Delete(new EntityDto<TPrimaryKey>(keys[0]));

            //Assert
            await UsingDbContextAsync(async context =>
            {
                TEntity savedEntity = await context.Set<TEntity>().FirstOrDefaultAsync(e => e.Id.CompareTo(keys[0]) == 0);

                if(savedEntity is ISoftDelete)
                {
                    (savedEntity as ISoftDelete).IsDeleted.ShouldBeTrue();
                }
                else
                {
                    savedEntity.ShouldBeNull();
                }
            });
        }
    }
}