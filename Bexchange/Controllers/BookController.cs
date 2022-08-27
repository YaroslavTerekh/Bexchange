using AutoMapper;
using Bexchange.Domain.CustomExceptions;
using Bexchange.Domain.Models;
using Bexchange.DTOs;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Bexchange.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IContentRepository<Book> _contentRepo;
        private readonly IMapper _mapper;

        public BookController(IContentRepository<Book> contentRepo, IMapper mapper)
        {
            _mapper = mapper;
            _contentRepo = contentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> Books()
        {
            var books = await _contentRepo.GetAllComponents();

            if (books == null) 
                throw new NotFoundException("No books here", 404);

            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _contentRepo.GetComponent(id);

            if (book == null) 
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<BookDto>(book));
        }

        [HttpPost]
        public async Task<IActionResult> AddBook(BookDto book)
        {
            var newBook = _mapper.Map<Book>(book);
            await _contentRepo.AddComponent(newBook);

            return Created(Request.Path, new { newBook.Id });
        }

        [HttpPut]
        public async Task<IActionResult> ModifyBook(BookDto book)
        {
            if (await _contentRepo.GetComponent(book.Id) == null) 
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

            await _contentRepo.ModifyComponent(_mapper.Map<Book>(book));

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (await _contentRepo.GetComponent(id) == null) 
                throw new NotFoundException("Book not found", (int)HttpStatusCode.NotFound);

            await _contentRepo.DeleteComponent(id);

            return Ok($"Book with id {id} was deleted");
        }
    }
}
