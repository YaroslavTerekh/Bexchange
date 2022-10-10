﻿using AutoMapper;
using Bexchange.API.DTOs;
using Bexchange.Domain;
using Bexchange.Domain.Models;
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
        public async Task<IActionResult> Books(int id)
        {
            var books = await _contentRepo.IgnoreUserBooksAsync(id);

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpGet("main-page/{amount}"), AllowAnonymous]
        public async Task<IActionResult> FirstBooks(int amount)
        {
            var books = await _contentRepo.GetFirstBooksAsync(amount);

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpGet("all"), Authorize(Policy = PoliciesConstants.Admins)]
        public async Task<IActionResult> AllBooks(CancellationToken token)
        {
            var books = await _contentRepo.GetAllComponentsAsync(token);

            if (books == null)
                throw new NotFoundException("No books here", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));

        }

        [HttpGet("all/verified/{usedId}"), AllowAnonymous]
        public async Task<IActionResult> AllVerifiedBooks(int userId)
        {
            var books = await _contentRepo.GetAllVerifiedBooksAsync(userId);

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

            if(book.UserId == _userService.GetUserId(HttpContext) || book.State == State.Verified || _userService.IsAdmin(HttpContext))
                return Ok(_mapper.Map<BookDto>(book));

            return BadRequest();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserBooks(int userId)
        {
            var books = await _contentRepo.GetUserComponentsAsync(userId);

            if (books == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpPost("add/book/{imgId}")]
        public async Task<IActionResult> AddBook(BookDto book, int imgId)
        {
            var newBook = _mapper.Map<Book>(book);

            newBook.UserId = _userService.GetUserId(HttpContext);
            newBook.User = await _usersRepository.GetUserAsync(newBook.UserId);
            newBook.ImageId = imgId;
            await _contentRepo.AddComponentAsync(newBook);

            return Created(Request.Path, new { Id = newBook.Id, Path = Request.Path + $"/{newBook.Id}" });
        }

        [HttpPost("add/image")]
        public async Task<IActionResult> AddImage()
        {
            var imgId = await _contentRepo.AddImageAsync(HttpContext, _env.WebRootPath, _userService, _env.ContentRootPath);

            return Ok(imgId);
        }

        [HttpGet("image/{id}"), AllowAnonymous]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = await _contentRepo.GetImageAsync(id);

            if (image == null)
                throw new NotFoundException("Image not found", (int)HttpStatusCode.NotFound);

            return PhysicalFile(image.Path, "image/png");
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
            Book book = await _contentRepo.GetComponentAsync(id);

            if (book == null)
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

            if (_userService.GetUserId(HttpContext) == book.UserId || _userService.IsAdmin(HttpContext))
            {
                await _contentRepo.DeleteComponentAsync(book.ImageId);
                
                return Ok();
            }

            return BadRequest("you can delete only your own book");
        }

        [HttpPatch("{id}/comments/add")]
        public async Task<IActionResult> AddComment(CommentDto comment, int id)
        {
            var mappedComment = _mapper.Map<Comment>(comment);
            var user = await _usersRepository.GetUserAsync(_userService.GetUserId(HttpContext));

            await _contentRepo.AddCommentAsync(mappedComment, id, user);

            return Created(Request.Path, new { comment });
        }

        // GENRES, AUTHORS

        [HttpPost("genre/add"), Authorize(Policy = PoliciesConstants.Admins)]
        public async Task<IActionResult> AddGenre(Genre genre)
        {
            await _contentRepo.AddGenreAsync(genre);

            return Created(Request.Path, new { genre });
        }

        [HttpGet("genres"), AllowAnonymous]
        public async Task<IActionResult> Genres()
        {
            var genres = await _contentRepo.GetGenresAsync();

            if (genres == null)
                throw new NotFoundException("No genres were added", (int)HttpStatusCode.NotFound);

            return Ok(genres);
        }

        [HttpGet("genre/{genre}")]
        public async Task<IActionResult> GetByGenre(string genre)
        {
            var books = await _contentRepo.GetByGenreAsync(genre);

            if (books == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpGet("authors/verified"), AllowAnonymous]
        public async Task<IActionResult> Authors()
        {
            var authors = await _contentRepo.GetAuthorsAsync();

            if (authors == null)
                throw new NotFoundException("No authors were added", (int)HttpStatusCode.NotFound);

            return Ok(authors);
        }

        [HttpGet("authors"), Authorize(Policy = PoliciesConstants.Admins)]
        public async Task<IActionResult> AllAuthors()
        {
            var authors = await _contentRepo.GetAllAuthorsAsync();

            if (authors == null)
                throw new NotFoundException("No authors were added", (int)HttpStatusCode.NotFound);

            return Ok(authors);
        }

        [HttpGet("author/{author}")]
        public async Task<IActionResult> GetByAuthor(string author)
        {
            var books = await _contentRepo.GetByAuthorAsync(author);

            if (books == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpDelete("genre/delete/{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            await _contentRepo.DeleteGenreAsync(id);

            return NoContent();
        }
    }
}
