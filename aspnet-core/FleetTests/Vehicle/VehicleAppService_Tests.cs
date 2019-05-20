using System;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.EntityHistory;
using AbpCompanyName.AbpProjectName.Tests;
using BoundedContext.Application;
using BoundedContext.Application.Dtos;
using Castle.MicroKernel.Registration;
using NSubstitute;
using Shouldly;
using Xunit;

namespace FleetTests.Vehicle
{
    public class VehicleAppServiceTests : FleetTestBase
    {
        private readonly IVehicleAppService _vehicleAppSercviAppService;
        private IEntityHistoryStore _entityHistoryStore;
        

        public VehicleAppServiceTests()
        {
            _vehicleAppSercviAppService = Resolve<IVehicleAppService>();
        }
        protected override void PreInitialize()
        {
            base.PreInitialize();
            _entityHistoryStore = Substitute.For<IEntityHistoryStore>();
            LocalIocManager.IocContainer.Register(
                Component.For<IEntityHistoryStore>().Instance(_entityHistoryStore).LifestyleSingleton()
            );
     
        }

        private async Task<VehicleDto> CreateInitialVehicle()
        {
            var vehicleDto = new VehicleDto()
            {
                CountryId = 1,
                BranchId = 1,
                FuelId = 1,
                Odometer = 2500,
                VehicleManufacturingInfo = new VehicleManufacturingInfoDto(1, 2017, "48PleYf55586pl5vt"),
                VehicleLicenseInfo = new VehicleLicenseInfoDto(1, 1, "EGY88555600", "88555600323", DateTime.Now.AddDays(7)),
                LocationInfo = new VehicleLocationDto(1),
                PurchaseInfo = new VehiclePurchaseInfoDto(Guid.NewGuid(), DateTime.Now, 200000),
                Specs = new VehicleSpecsDto(1, 1)
                {
                    FuelTypeId = 1,
                    FuelTankSize = 60,
                    EngineSize = 2000
                }
            };
            await _vehicleAppSercviAppService.CreateOrUpdateVehicle(new CreateOrUpdateVehicleInput { Vehicle = vehicleDto });
            return vehicleDto;
        }
        [Fact]
        public async Task Should_Create_Audits_When_Update_Vehicle()
        {
            //Arrange
            var vehicle = await CreateInitialVehicle();

            //Act
            var vehicleDb = UsingDbContext(context => context.Vehicles.FirstOrDefault());
            var vehicleDto = new VehicleDto()
            {
                Id = vehicleDb.Id,
                CountryId = 2,
                BranchId = 2,
                FuelId = 3,
                Odometer = 4000,
                VehicleManufacturingInfo = new VehicleManufacturingInfoDto(2, 2020, "48PleYf55586pl222"),
                VehicleLicenseInfo = new VehicleLicenseInfoDto(2, 2, "EGY88555655", "88555600355", DateTime.Now.AddDays(1)),
                LocationInfo = new VehicleLocationDto(2),
                PurchaseInfo = new VehiclePurchaseInfoDto(Guid.NewGuid(), DateTime.Now, 200000),
                Specs = new VehicleSpecsDto(1, 1)
                {
                    FuelTypeId = 2,
                    FuelTankSize = 45,
                    EngineSize = 1600
                }
            };
            vehicleDto.LastModificationTime = DateTime.Today.AddDays(10);
            await _vehicleAppSercviAppService.CreateOrUpdateVehicle(new CreateOrUpdateVehicleInput { Vehicle = vehicleDto });


            //Assert
            UsingDbContext(context =>
            {
                context.Vehicles.ShouldNotBeNull();
                context.Vehicles.Count().ShouldBe(1);
            });

            Predicate<EntityChangeSet> predicate = s =>
            {
                s.EntityChanges.Count.ShouldBe(1);
                return true;
            };
             await _entityHistoryStore.Received().SaveAsync(Arg.Is<EntityChangeSet>(s => predicate(s)));

             UsingDbContext((context) =>
             {
                 context.EntityChanges.Count(f => f.TenantId == tenantId).ShouldBe(0);
             });
        }

    }
}
