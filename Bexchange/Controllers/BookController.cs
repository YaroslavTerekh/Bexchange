using AutoMapper;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services;
using BexchangeAPI.Domain.CustomExceptions;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.DTOs;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace BexchangeAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IContentRepository<Book> _contentRepo;
        private readonly IUsersRepository<User> _usersRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public BookController(IContentRepository<Book> contentRepo, IUsersRepository<User> usersRepository, 
            IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _contentRepo = contentRepo;
            _usersRepository = usersRepository;
            _userService = userService;
        }

        [HttpGet, AllowAnonymous]
        public async Task<IActionResult> Books()
        {
            var books = await _contentRepo.GetAllComponentsAsync();

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _contentRepo.GetComponentAsync(id);

            if (book == null)
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<BookDto>(book));
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserBooks(int userId)
        {
            var books = await _contentRepo.GetUserComponentsAsync(userId);

            if (books == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBook(BookDto book)
        {
            var newBook = _mapper.Map<Book>(book);

            newBook.UserId = _userService.GetUserId(HttpContext);
            newBook.User = await _usersRepository.GetUserAsync(newBook.UserId);
            await _contentRepo.AddComponentAsync(newBook);

            return Created(Request.Path, new { Id = newBook.Id, Path = Request.Path + $"/{newBook.Id}" });

            //return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
        }

        [HttpPut("modify")]
        public async Task<IActionResult> ModifyBook(BookDto book)
        {
            if (_userService.GetUserId(HttpContext) == book.UserId || _userService.IsAdmin(HttpContext))
            {
                if (await _contentRepo.GetComponentAsync(book.Id) == null)
                    throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

                await _contentRepo.ModifyComponentAsync(_mapper.Map<Book>(book));

                return Ok();
            }

            return BadRequest("You can modify only your own books");

            //return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (await _contentRepo.GetComponentAsync(id) == null)
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);
            
            Book book = await _contentRepo.GetComponentAsync(id);

            if (_userService.GetUserId(HttpContext) == book.UserId || _userService.IsAdmin(HttpContext))
            {
                await _contentRepo.DeleteComponentAsync(id);
                return NoContent();
            }

            return BadRequest("You can delete only your own book");
        }
    }
}
