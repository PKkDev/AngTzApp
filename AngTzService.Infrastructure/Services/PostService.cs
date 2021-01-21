using AngTzService.Domain.Dto;
using AngTzService.Domain.ServiceContract;
using AngTzService.Infrastructure.Context;
using AngTzService.Infrastructure.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AngTzService.Infrastructure.Services
{
    public class PostService : IPostService
    {
        private readonly DashboardContext _context;

        public PostService(DashboardContext context)
        {
            _context = context;
        }

        public async Task<bool> AddPost(PostDto post, CancellationToken ct)
        {
            try
            {
                var newPost = new Post();
                newPost.Author = post.Author;
                newPost.Date = DateTime.Now;
                newPost.Text = post.Text;
                newPost.Edited = false;
                await _context.Post.AddAsync(newPost, ct);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeletePost(int id, CancellationToken ct)
        {
            try
            {
                var post = await _context.Post.FirstOrDefaultAsync(x => x.Id == id);
                if (post != null)
                {
                    _context.Post.Remove(post);
                    await _context.SaveChangesAsync(ct);
                    return true;
                }

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<int> GetCountPosts(CancellationToken ct)
        {
            return await _context.Post.CountAsync(ct);
        }

        public async Task<PostDto> GetPost(int id, CancellationToken ct)
        {
            var post = await _context.Post
                .Where(x => x.Id == id)
               .Select(x => new PostDto()
               {
                   Author = x.Author,
                   Date = x.Date,
                   Edited = x.Edited,
                   Id = x.Id,
                   Text = x.Text
               })
               .FirstOrDefaultAsync(ct);

            return post;
        }

        public async Task<IEnumerable<PostDto>> GetPosts(CancellationToken ct)
        {
            var result = new List<PostDto>();

            var posts = await _context.Post
                .Select(x => new PostDto()
                {
                    Author = x.Author,
                    Date = x.Date,
                    Edited = x.Edited,
                    Id = x.Id,
                    Text = x.Text
                })
                .ToListAsync(ct);

            return posts;
        }

        public async Task<bool> UpdatePost(int id, PostDto post, CancellationToken ct)
        {
            try
            {
                var oldPost = await _context.Post.FirstOrDefaultAsync(x => x.Id == id);
                if (oldPost != null)
                {
                    oldPost.Author = post.Author;
                    oldPost.Date = DateTime.Now;
                    oldPost.Edited = post.Edited;
                    oldPost.Text = post.Text;
                    _context.Post.Update(oldPost);
                    await _context.SaveChangesAsync(ct);
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
