using System;
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

        protected TService AppService{
            get{
                return _appService;
            }
        }

        protected AbpProjectNameAsyncServiceTestBase()
        {
            _appService = Resolve<TService>();
        }

        protected abstract TEntity create(int number);
        protected abstract TCreateDto getCreateDto(int number);

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
    }
}