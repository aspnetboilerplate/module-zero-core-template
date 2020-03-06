using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq;
using Abp.Linq.Extensions;
using AbpCompanyName.AbpProjectName.AuditLogs.Dto;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using System.Linq;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.AuditLogs
{
    public class AuditLogAppService : AbpProjectNameAppServiceBase, IAuditLogAppService
    {
        private readonly IRepository<AuditLog, long> auditLogRepository;
        private readonly IRepository<User, long> userRepository;
        public IAsyncQueryableExecuter AsyncQueryableExecuter { get; set; }
        public AuditLogAppService(IRepository<AuditLog, long> auditLogRepository,
            IRepository<User, long> userRepository)
        {
            this.auditLogRepository = auditLogRepository;
            this.userRepository = userRepository;
            AsyncQueryableExecuter = NullAsyncQueryableExecuter.Instance;
        }

        public async Task<PagedResultDto<AuditLogDto>> GetAllAsync(PagedAuditLogResultRequestDto input)
        {
            var query = CreateFilteredQuery(input);

            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<AuditLogDto>(
                totalCount,
                entities.ToList()
            );
        }

        protected IQueryable<AuditLogDto> CreateFilteredQuery(PagedAuditLogResultRequestDto input)
        {
            var result = (from a in auditLogRepository.GetAll()
                          join u in userRepository.GetAll() on a.UserId equals u.Id into au
                          from u in au.DefaultIfEmpty()
                          select new AuditLogDto
                          {
                              Id = a.Id,
                              ExecutionTime = a.ExecutionTime,
                              UserName = u == null ? "" : u.UserName, //use u.FullName would error
                              ServiceName = a.ServiceName,
                              MethodName = a.MethodName,
                              ExecutionDuration = a.ExecutionDuration,
                              ClientIpAddress = a.ClientIpAddress,
                              ClientName = a.ClientName,
                              BrowserInfo = a.BrowserInfo
                          })
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(),
                x => (!string.IsNullOrWhiteSpace(x.UserName) && x.UserName.Contains(input.Keyword))
                || (!string.IsNullOrWhiteSpace(x.ServiceName) && x.ServiceName.Contains(input.Keyword))
                || (!string.IsNullOrWhiteSpace(x.MethodName) && x.MethodName.Contains(input.Keyword))
                || (!string.IsNullOrWhiteSpace(x.ClientName) && x.ClientName.Contains(input.Keyword))
                || (!string.IsNullOrWhiteSpace(x.ClientIpAddress) && x.ClientIpAddress.Contains(input.Keyword))
                );
            return result;
        }

        protected IQueryable<AuditLogDto> ApplyPaging(IQueryable<AuditLogDto> query, PagedAuditLogResultRequestDto input)
        {
            //Try to use paging if available
            var pagedInput = input as IPagedResultRequest;
            if (pagedInput != null)
            {
                return query.PageBy(pagedInput);
            }

            //Try to limit query result if available
            var limitedInput = input as ILimitedResultRequest;
            if (limitedInput != null)
            {
                return query.Take(limitedInput.MaxResultCount);
            }

            //No paging
            return query;
        }

        protected IQueryable<AuditLogDto> ApplySorting(IQueryable<AuditLogDto> query, PagedAuditLogResultRequestDto input)
        {
            return query.OrderBy(r => r.ExecutionTime);
        }
    }
}
