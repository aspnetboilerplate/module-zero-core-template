using System;
using System.Collections.Generic;
using Castle.Core.Logging;

namespace AbpCompanyName.AbpProjectName.Tests.UnitTests.FakeServices
{
    public class FakeLogger : NullLogger, ILogger
    {
        public readonly List<Tuple<LoggerLevel, string>> Logs = new List<Tuple<LoggerLevel, string>>();

        public new void Debug(string message)
        {
            AddLog(message, LoggerLevel.Debug);
        }

        public new void Warn(string message)
        {
            AddLog(message, LoggerLevel.Warn);
        }

        void ILogger.Info(string message)
        {
            AddLog(message, LoggerLevel.Info);
        }

        public new void Error(string message)
        {
            AddLog(message, LoggerLevel.Error);
        }

        private void AddLog(string message, LoggerLevel level)
        {
            Logs.Add(new Tuple<LoggerLevel, string>(level, message));
        }
    }
}
