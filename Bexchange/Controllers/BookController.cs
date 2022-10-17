using AutoMapper;
using Bexchange.API.DTOs;
using Bexchange.Domain;
using Bexchange.Domain.Models;
using Bexchange.Domain.RequestModels;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.CustomExceptions;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.DTOs;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.Net;
using System.Security.Claims;

namespace BexchangeAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookContentRepository<Book> _contentRepo;
        private readonly IUsersRepository<User> _usersRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _env;

        public BookController(IBookContentRepository<Book> contentRepo, IUsersRepository<User> usersRepository,
            IMapper mapper, IUserService userService, IWebHostEnvironment env)
        {
            _mapper = mapper;
            _contentRepo = contentRepo;
            _usersRepository = usersRepository;
            _userService = userService;
            _env = env;
        }
         
        [HttpGet("user/ignore/{id}")] 
        public async Task<IActionResult> Books(int id, CancellationToken token = default)
        {
            var books = await _contentRepo.IgnoreUserBooksAsync(id, token);

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpGet("main-page/{amount}"), AllowAnonymous] 
        public async Task<IActionResult> FirstBooks(int amount = 10, CancellationToken token = default)
        {
            var books = await _contentRepo.GetFirstBooksAsync(amount, token);

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpGet("all"), Authorize(Policy = PoliciesConstants.Admins)]
        public async Task<IActionResult> AllBooks(CancellationToken token = default)
        {
            var books = await _contentRepo.GetAllComponentsAsync(token);

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));

        }

        [HttpGet("all/verified/{usedId}"), AllowAnonymous] 
        public async Task<IActionResult> AllVerifiedBooks(int userId, CancellationToken token = default)
        {
            var books = await _contentRepo.GetAllVerifiedBooksAsync(userId, token);

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));

        }

        [HttpPost("search"), AllowAnonymous] 
        public async Task<IActionResult> SearchBook(SearchBookRequest request, CancellationToken token = default)
        {
            var books = await _contentRepo.SearchBooksAsync(request.Title, token);

            return Ok(books);
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetBook(int id, CancellationToken token = default)
        {
            var book = await _contentRepo.GetComponentAsync(id, token);

            if (book == null)
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

            if(book.UserId == _userService.GetUserId(HttpContext) || book.State == State.Verified || _userService.IsAdmin(HttpContext))
                return Ok(_mapper.Map<BookDto>(book));

            return BadRequest();
        }

        [HttpGet("user/{userId}")] 
        public async Task<IActionResult> GetUserBooks(int userId, CancellationToken token = default)
        {
            var books = await _contentRepo.GetUserComponentsAsync(userId, token);

            if (books == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpPost("add/book/{imgId}")] 
        public async Task<IActionResult> AddBook(BookDto book, int imgId, CancellationToken token = default)
        {
            var newBook = _mapper.Map<Book>(book);

            newBook.UserId = _userService.GetUserId(HttpContext);
            newBook.User = await _usersRepository.GetUserAsync(newBook.UserId, token);
            newBook.ImageId = imgId;
            await _contentRepo.AddComponentAsync(newBook, token);

            return Created(Request.Path, new { Id = newBook.Id, Path = Request.Path + $"/{newBook.Id}" });
        }

        [HttpPost("add/image")] 
        public async Task<IActionResult> AddImage(CancellationToken token = default)
        {
            var imgId = await _contentRepo.AddImageAsync(HttpContext, _env.WebRootPath, _userService, _env.ContentRootPath, token);

            return Ok(imgId);
        }

        [HttpGet("image/{id}"), AllowAnonymous]
        public async Task<IActionResult> GetImage(int id, CancellationToken token = default)
        {
            var image = await _contentRepo.GetImageAsync(id, token);

            if (image == null)
                throw new NotFoundException("Image not found", (int)HttpStatusCode.NotFound);

            return PhysicalFile(image.Path, "image/png");
        }

        [HttpDelete("delete/{id}")] 
        public async Task<IActionResult> DeleteBook(int id, CancellationToken token = default)
        {
            Book book = await _contentRepo.GetComponentAsync(id, token);

            if (book == null)
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

            if (_userService.GetUserId(HttpContext) == book.UserId || _userService.IsAdmin(HttpContext))
            {
                await _contentRepo.DeleteComponentAsync(book.ImageId, token);
                
                return Ok();
            }

            return BadRequest("you can delete only your own book");
        }

        [HttpPatch("{id}/comments/add")] 
        public async Task<IActionResult> AddComment(CommentDto comment, int id, CancellationToken token = default)
        {
            var mappedComment = _mapper.Map<Comment>(comment);
            var user = await _usersRepository.GetUserAsync(_userService.GetUserId(HttpContext), token);

            await _contentRepo.AddCommentAsync(mappedComment, id, user, token);

            return Created(Request.Path, new { comment });
        }

        [HttpPost("genre/add"), Authorize(Policy = PoliciesConstants.Admins)] 
        public async Task<IActionResult> AddGenre(Genre genre, CancellationToken token = default)
        {
            await _contentRepo.AddGenreAsync(genre, token);

            return Created(Request.Path, new { genre });
        }

        [HttpGet("genres"), AllowAnonymous] 
        public async Task<IActionResult> Genres(CancellationToken token = default)
        {
            var genres = await _contentRepo.GetGenresAsync(token);

            if (genres == null)
                throw new NotFoundException("No genres were added", (int)HttpStatusCode.NotFound);

            return Ok(genres);
        }

        [HttpGet("genre/{genre}")] 
        public async Task<IActionResult> GetByGenre(string genre, CancellationToken token = default)
        {
            var books = await _contentRepo.GetByGenreAsync(genre, token);

            if (books == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpGet("authors/verified"), AllowAnonymous] 
        public async Task<IActionResult> Authors(CancellationToken token = default)
        {
            var authors = await _contentRepo.GetAuthorsAsync(token);

            if (authors == null)
                throw new NotFoundException("No authors were added", (int)HttpStatusCode.NotFound);

            return Ok(authors);
        }

        [HttpGet("authors"), Authorize(Policy = PoliciesConstants.Admins)] 
        public async Task<IActionResult> AllAuthors(CancellationToken token = default)
        {
            var authors = await _contentRepo.GetAllAuthorsAsync(token);

            if (authors == null)
                throw new NotFoundException("No authors were added", (int)HttpStatusCode.NotFound);

            return Ok(authors);
        }

        [HttpGet("author/{author}")] 
        public async Task<IActionResult> GetByAuthor(string author, CancellationToken token = default)
        {
            var books = await _contentRepo.GetByAuthorAsync(author, token);

            if (books == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpDelete("genre/delete/{id}")] 
        public async Task<IActionResult> DeleteGenre(int id, CancellationToken token = default)
        {
            await _contentRepo.DeleteGenreAsync(id, token);

            return NoContent();
        }
    }
}
