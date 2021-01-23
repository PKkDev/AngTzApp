using AngTzService.Domain.Dto;
using AngTzService.Domain.ServiceContract;
using AngTzService.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AngTzService.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly DashboardContext _context;

        public AuthService(DashboardContext context)
        {
            _context = context;

        }
        /// <summary>
        /// авторизация
        /// </summary>
        /// <param name="ct"></param>
        /// <param name="auth"></param>
        /// <returns></returns>
        public async Task<bool> AuthUser(AuthDto auth, CancellationToken ct)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.UserName.Equals(x.Password), ct);
            if (user != null)
            {
                if (user.Password.Equals(auth.Password))
                    return true;
            }
            return false;
        }
    }
}
