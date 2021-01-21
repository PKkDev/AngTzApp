using AngTzService.Domain.Dto;
using AngTzService.Domain.ServiceContract;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace AngTzService.API.Controllers
{
    /// <summary>
    /// контроллер авторизации пользователей
    /// </summary>
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly IAuthService _service;

        /// <summary>
        /// инициализация контроллера авторизации пользователей
        /// </summary>
        /// <param name="service"></param>
        public AuthController(IAuthService service)
        {
            _service = service;
        }

        /// <summary>
        /// авторизация
        /// </summary>
        /// <param name="ct"></param>
        /// <param name="auth"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<Boolean> AuthUser([FromBody] AuthDto auth, CancellationToken ct = default)
        {
            return await _service.AuthUser(auth, ct);
        }
    }
}
