using System.Collections.Generic;
using System.Linq;
using Abp;
using Abp.Domain.Values;

namespace BoundedContext.Domain.ValueObjects
{
    public class VehicleStatus : ValueObject<VehicleStatus>
    {
        public long StatusId { get; private set; }

        private string _additionalStatuses;
        public IReadOnlyCollection<long> AdditionalStatuses
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_additionalStatuses))
                    return new List<long>();

                return _additionalStatuses.Split(',').Select(long.Parse).ToList();
            }
        }

        private VehicleStatus()
        {
        }

        public VehicleStatus(long statusId) : this(statusId, null)
        {

        }

        public VehicleStatus(long statusId, List<long> additionalStatuses)
        {
            StatusId = statusId;
            SetAdditionalStatuses(additionalStatuses);
        }

        private void SetAdditionalStatuses(List<long> additionalStatuses)
        {
            if (additionalStatuses != null && additionalStatuses.Count != 0)
                _additionalStatuses = string.Join(",", additionalStatuses.ToArray());
            else
                _additionalStatuses = null;
        }

        private void AddAdditionalStatuses(List<long> additionalStatuses)
        {
            var additionalStatusesAsString = string.Join(",", additionalStatuses.ToArray());
            _additionalStatuses = string.IsNullOrWhiteSpace(_additionalStatuses) ?
                additionalStatusesAsString : $"{_additionalStatuses},{additionalStatusesAsString}";
        }

        private void AddAdditionalStatus(long status)
        {
            var additionalStatuses = new List<long> { status };
            AddAdditionalStatuses(additionalStatuses);
        }

        private void RemoveAdditionalStatus(long status)
        {
            SetAdditionalStatuses(AdditionalStatuses.Where(a => a != status).ToList());
        }

    }
}
