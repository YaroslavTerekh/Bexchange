using AutoMapper;
using Bexchange.Domain.Models;
using Bexchange.DTOs;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bexchange.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBooksRepository _contentRepo;
        private readonly IMapper _mapper;

        public BookController(IBooksRepository contentRepo, IMapper mapper)
        {
            _mapper = mapper;
            _contentRepo = contentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> Books()
        {
            try
            {
                var books = await _contentRepo.GetAllBooks();

                return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                return Ok(_mapper.Map<BookDto>(await _contentRepo.GetBook(id)));
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddBook(BookDto book)
        {
            try
            {
                var newBook = _mapper.Map<Book>(book);

                await _contentRepo.AddBook(newBook);

                return CreatedAtAction(nameof(_contentRepo.AddBook), new { id = newBook.Id }, book);
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> ModifyBook(Book book)
        {
            try
            {
                await _contentRepo.ModifyBook(book);

                return Ok();
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                await _contentRepo.DeleteBook(id);

                return Ok($"Book with id {id} was deleted");
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }
    }
}
