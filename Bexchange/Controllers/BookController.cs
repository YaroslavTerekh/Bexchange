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
            try
            {
                var books = await _contentRepo.GetAllComponents();

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
                return Ok(_mapper.Map<BookDto>(await _contentRepo.GetComponent(id)));
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

                await _contentRepo.AddComponent(newBook);

                return Ok(newBook);
                //return CreatedAtAction(nameof(_contentRepo.AddComponent), new { id = newBook.Id }, book);
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
                await _contentRepo.ModifyComponent(book);

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
                await _contentRepo.DeleteComponent(id);

                return Ok($"Book with id {id} was deleted");
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }
    }
}
