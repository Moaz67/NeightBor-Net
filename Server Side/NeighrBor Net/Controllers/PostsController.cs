using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NeighrBor_Net.DBContext;
using NeighrBor_Net.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly NeighBorNetDB _context;

    public PostsController(NeighBorNetDB context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<IActionResult> GetPosts()
    {
        var posts = await _context.Posts
            .Include(p => p.Location)
            .Include(x => x.User)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var response = posts.Select(p => new {
            p.Id,
            p.detail,
            image = string.IsNullOrEmpty(p.ImagePath) ? null : baseUrl + p.ImagePath,
            p.CreatedAt,
            p.User,
            p.Location,
            p.Likes,
            p.Comments,
            Type=p.Type.ToString().ToLower(),
        });

        return Ok(response);
    }


    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        
        var relativePath = "/uploads/" + uniqueFileName;

        return Ok(new { path = relativePath });
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost([FromForm] Post post)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(post.detail))
                return BadRequest("Post detail is required");

            post.CreatedAt = DateTime.UtcNow;
            //post.UserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            // Save uploaded image if exists
            if (post.Image != null && post.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid() + Path.GetExtension(post.Image.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await post.Image.CopyToAsync(stream);
                }

                post.ImagePath = "/uploads/" + fileName;
            }

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpPost("like")]

    
 
        public async Task<IActionResult> ToggleLike(long id)
        {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
                var sql = @"
                IF EXISTS (SELECT 1 FROM PostLikes WHERE PostId = @postId AND UserId = @userId)
                BEGIN
                    DELETE FROM PostLikes WHERE PostId = @postId AND UserId = @userId;
                END
                ELSE
                BEGIN
                    INSERT INTO PostLikes (PostId, UserId) VALUES (@postId, @userId);
                END;

                SELECT COUNT(*) AS LikesCount FROM PostLikes WHERE PostId = @postId;
            ";

            var result = await _context.Database
                .SqlQueryRaw<int>(sql, 
                    new SqlParameter("@postId", id),
                    new SqlParameter("@userId", userId))
                .FirstOrDefaultAsync();

            return Ok(result);
        }




    [HttpPost("{id}/comment")]
    public async Task<IActionResult> AddComment(long id, [FromBody] string commentText)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null) return NotFound();

      
        post.Comments++;

        var commentData = new Comments
        {
            Detail = commentText,
            PostId = id
        };
        await _context.AddAsync(commentData);
        await _context.SaveChangesAsync();

        return Ok(new { commentData.Id, commentData.Detail });
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        var userId = _context.Users.Find(id).Id;
        var post = await _context.Posts.FindAsync(id);

        if (post == null)
        {
            return NotFound();
        }

        if (post.UserId != userId)
        {
            return Forbid();
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    [HttpPost("{id}/like")]
    public async Task<IActionResult> LikePost(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null)
        {
            return NotFound();
        }

        post.Likes++;
        await _context.SaveChangesAsync();

        return Ok(new { likes = post.Likes });
    }
}
