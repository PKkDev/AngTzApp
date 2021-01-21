using AngTzService.Domain.Dto;
using System.Threading;
using System.Threading.Tasks;

namespace AngTzService.Domain.ServiceContract
{
    public interface IAuthService
    {
        public Task<bool> AuthUser(AuthDto auth, CancellationToken ct);
    }
}
