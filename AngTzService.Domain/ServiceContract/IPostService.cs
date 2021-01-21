using AngTzService.Domain.Dto;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace AngTzService.Domain.ServiceContract
{
    public interface IPostService
    {

        public Task<IEnumerable<PostDto>> GetPosts(CancellationToken ct);

        public Task<int> GetCountPosts(CancellationToken ct);

        public Task<PostDto> GetPost(int id, CancellationToken ct);

        public Task<bool> UpdatePost(int id, PostDto post, CancellationToken ct);

        public Task<bool> AddPost(PostDto post, CancellationToken ct);

        public Task<bool> DeletePost(int id, CancellationToken ct);


    }
}
