using AngTzService.Domain.Dto;
using AngTzService.Domain.ServiceContract;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace AngTzService.API.Controllers
{
    /// <summary>
    /// контроллер обработки постов
    /// </summary>
    [ApiController]
    [Route("post")]
    public class PostController : Controller
    {
        private readonly IPostService _service;

        /// <summary>
        /// инициализация контроллера обработки постов
        /// </summary>
        /// <param name="service"></param>
        public PostController(IPostService service)
        {
            _service = service;
        }

        /// <summary>
        /// получение всех постов
        /// </summary>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpGet("list")]
        public async Task<IEnumerable<PostDto>> GetListPost(CancellationToken ct = default)
        {
            return await _service.GetPosts(ct);
        }

        /// <summary>
        /// получение количества постов
        /// </summary>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpGet("count")]
        public async Task<int> GetCountPost(CancellationToken ct = default)
        {
            return await _service.GetCountPosts(ct);
        }

        /// <summary>
        /// получение поста по id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<PostDto> GetPost
            ([FromQuery] int id, CancellationToken ct = default)
        {
            return await _service.GetPost(id, ct);
        }

        /// <summary>
        /// изменение поста
        /// </summary>
        /// <param name="id"></param>
        /// <param name="post"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpPost("update")]
        public async Task<IActionResult> UpdatePost
            ([FromQuery] int id, [FromBody] PostDto post, CancellationToken ct = default)
        {
            var result = await _service.UpdatePost(id, post, ct);
            if (result)
                return Ok();
            return BadRequest();
        }

        /// <summary>
        /// добавление поста
        /// </summary>
        /// <param name="post"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public async Task<IActionResult> InsertPost
            ([FromBody] PostDto post, CancellationToken ct = default)
        {
            var result = await _service.AddPost(post, ct);
            if (result)
                return Ok();
            return BadRequest();
        }

        /// <summary>
        /// удаление поста
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpPost("remove")]
        public async Task<IActionResult> RemovePost
            ([FromQuery] int id, CancellationToken ct = default)
        {
            var result = await _service.DeletePost(id, ct);
            if (result)
                return Ok();
            return BadRequest();
        }


    }
}

