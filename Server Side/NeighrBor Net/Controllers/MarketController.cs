using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeighrBor_Net.DBContext;
using NeighrBor_Net.Entities;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace NeighrBor_Net.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarketController : ControllerBase
    {
        private readonly NeighBorNetDB _context;
        private readonly IMapper _mapper;

        public MarketController(NeighBorNetDB context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MarketItemDto>>> GetMarketItems()
        {
            var items = await _context.Markets
                .Include(m => m.User)
                .Include(m => m.Location)
                
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();

            return Ok(_mapper.Map<List<MarketItemDto>>(items));
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<MarketItemDto>> GetMarketItem(long id)
        {
            var marketItem = await _context.Markets
                .Include(m => m.User)
                .Include(m => m.Location)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (marketItem == null)
            {
                return NotFound();
            }

            return _mapper.Map<MarketItemDto>(marketItem);
        }

       
        [HttpPost]
        public async Task<ActionResult<Market>> PostMarketItem([FromForm] CreateMarketItemDto marketItemDto)
        {
            var marketItem = _mapper.Map<Market>(marketItemDto);

           
            if (marketItemDto.Image != null)
            {
                var fileName = $"{Guid.NewGuid()}_{marketItemDto.Image.FileName}";
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await marketItemDto.Image.CopyToAsync(stream);
                }

                marketItem.ImagePath = $"/images/{fileName}";
            }

            marketItem.CreatedAt = DateTime.UtcNow;

            _context.Markets.Add(marketItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMarketItem", new { id = marketItem.Id }, _mapper.Map<MarketItemDto>(marketItem));
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMarketItem(long id, UpdateMarketItemDto marketItemDto)
        {
            if (id != marketItemDto.Id)
            {
                return BadRequest();
            }

            var marketItem = await _context.Markets.FindAsync(id);
            if (marketItem == null)
            {
                return NotFound();
            }

            _mapper.Map(marketItemDto, marketItem);

           
            if (marketItemDto.Image != null)
            {
                
                if (!string.IsNullOrEmpty(marketItem.ImagePath))
                {
                    var oldFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", marketItem.ImagePath.TrimStart('/'));
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                var fileName = $"{Guid.NewGuid()}_{marketItemDto.Image.FileName}";
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await marketItemDto.Image.CopyToAsync(stream);
                }

                marketItem.ImagePath = $"/images/{fileName}";
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarketItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMarketItem(long id)
        {
            var marketItem = await _context.Markets.FindAsync(id);
            if (marketItem == null)
            {
                return NotFound();
            }

           
            if (!string.IsNullOrEmpty(marketItem.ImagePath))
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", marketItem.ImagePath.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _context.Markets.Remove(marketItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MarketItemExists(long id)
        {
            return _context.Markets.Any(e => e.Id == id);
        }
    }

   
    public class MarketItemDto
    {
        public long Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserImagePath { get; set; }
        public long UserLikes { get; set; }
        public long UserDislikes { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LocationName { get; set; }
        public string ImagePath { get; set; }
        public bool IsAvailable { get; set; }
        public decimal Price { get; set; }
    }

    public class CreateMarketItemDto
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public string LocationName { get; set; }
        public IFormFile Image { get; set; }
        public bool IsAvailable { get; set; } = true;
        public decimal Price { get; set; }
    }

    public class UpdateMarketItemDto
    {
        public long Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string LocationName { get; set; }
        public IFormFile Image { get; set; }
        public bool IsAvailable { get; set; }
        public decimal Price { get; set; }
    }

   
    public class MarketProfile : Profile
    {
        public MarketProfile()
        {
            CreateMap<Market, MarketItemDto>()
                .ForMember(dest => dest.UserFirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.UserImagePath, opt => opt.MapFrom(src => src.User.ImagePath))
                .ForMember(dest => dest.UserLikes, opt => opt.MapFrom(src => src.User.Likes))
                .ForMember(dest => dest.UserDislikes, opt => opt.MapFrom(src => src.User.Dislikes));

            CreateMap<CreateMarketItemDto, Market>();
            CreateMap<UpdateMarketItemDto, Market>();
        }
    }
}

