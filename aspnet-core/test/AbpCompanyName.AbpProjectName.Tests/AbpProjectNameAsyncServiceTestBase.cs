using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Abp;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.Dependency;
using Abp.Domain.Entities;
using Abp.EntityFrameworkCore;
using Abp.Events.Bus;
using Abp.Events.Bus.Entities;
using Abp.Runtime.Session;
using Abp.TestBase;
using Abp.Zero.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;

using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore.Seed.Host;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore.Seed.Tenants;

using AbpCompanyName.AbpProjectName.MultiTenancy;
using Castle.MicroKernel.Registration;

using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;

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
                    //Create Additional Entities:: createAdditionalEntities() //

                    return entity.Id;
                });

                ids.Add(id);
            }

            keys = ids.ToArray();
        } 

        protected abstract Task<TEntity> createEntity(int entityNumer);

        protected abstract TCreateDto  getCreateDto(int number);

        //Get
        //GetAll
        //Create
        //Update
        //Delete

        [Fact]
        public async Task Create_Test()
        {
            //Arrange
            TCreateDto createDto = getCreateDto(1);

            //Act
            TEntityDto createdEntityDto = await _appService.Create(createDto);
            
            //Assert
            await UsingDbContextAsync(async context =>
            {
                TEntity savedEntity = await context.Set<TEntity>().FirstOrDefaultAsync(e => e.Id.CompareTo(createdEntityDto.Id) == 0);
                savedEntity.ShouldNotBeNull();
            });
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
        public async Task GetAll_Test()
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
        public async Task GetAll_Paging_Test()
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

        // [Fact]
        // public async Task Update_Test()
        // {
        // }

        // [Fact]
        // public async Task Delete_Test()
        // {
        // }
    }
}