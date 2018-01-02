using System;
using Castle.Facilities.Logging;
using Abp;
using Abp.Castle.Logging.Log4Net;
using Abp.Collections.Extensions;
using Abp.Dependency;

namespace AbpCompanyName.AbpProjectName.Migrator
{
    public class Program
    {
        private static bool _skipConnVerification = false;
        private static bool _runInQuietMode = false;

        public static void Main(string[] args)
        {
            ParseArgs(args);

            using (var bootstrapper = AbpBootstrapper.Create<AbpProjectNameMigratorModule>())
            {
                bootstrapper.IocManager.IocContainer
                    .AddFacility<LoggingFacility>(
                        f => f.UseAbpLog4Net().WithConfig("log4net.config")
                    );

                bootstrapper.Initialize();

                using (var migrateExecuter = bootstrapper.IocManager.ResolveAsDisposable<MultiTenantMigrateExecuter>())
                {
                    migrateExecuter.Object.Run(_skipConnVerification);
                }

                if (!_runInQuietMode)
                {
                    Console.WriteLine("Press ENTER to exit...");
                    Console.ReadLine();
                }
            }
        }

        private static void ParseArgs(string[] args)
        {
            if (args.IsNullOrEmpty())
            {
                return;
            }

            foreach (var arg in args)
            {
                switch (arg)
                {
                    case "-s":
                        _skipConnVerification = true;
                        break;
                    case "-q":
                        _runInQuietMode = true;
                        break;
                }
            }
        }
    }
}
