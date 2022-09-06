using AutoMapper;
using Bexchange.Infrastructure.Repositories.Interfaces;
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
        public readonly IUsersRepository<User> _usersRepository;
        private readonly IMapper _mapper;

        public BookController(IContentRepository<Book> contentRepo, IUsersRepository<User> usersRepository, IMapper mapper)
        {
            _mapper = mapper;
            _contentRepo = contentRepo;
            _usersRepository = usersRepository;
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

            newBook.UserId = GetUserId();
            newBook.User = await _usersRepository.GetUserAsync(newBook.UserId);
            await _contentRepo.AddComponentAsync(newBook);

            return Created(Request.Path, new { newBook.Id });

            //return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
        }

        [HttpPut("modify")]
        public async Task<IActionResult> ModifyBook(BookDto book)
        {
            if (GetUserId() == book.UserId || IsAdmin())
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

            if (GetUserId() == book.UserId || IsAdmin())
            {
                await _contentRepo.DeleteComponentAsync(id);
                return Ok($"Book with id {id} was deleted");
            }

            return BadRequest("You can delete only your own book");
        }

        private int GetUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = identity.FindFirst("id").Value;
            return Int32.Parse(id);
        }

        private bool IsAdmin()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var role = identity.FindFirst(ClaimTypes.Role).Value;

            return role == Roles.Admin.ToString() | role == Roles.SuperAdmin.ToString() ? true : false;
        }
    }
}
