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
    public class OrderController : ControllerBase
    {
        private readonly IContentRepository<ExchangeOrder> _orderRepo;
        private readonly IContentRepository<Book> _bookRepo;
        private readonly IMapper _mapper;

        public OrderController(IContentRepository<ExchangeOrder> contentRepo, IMapper mapper, IContentRepository<Book> bookRepo)
        {
            _orderRepo = contentRepo;
            _mapper = mapper;
            _bookRepo = bookRepo;
        }

        [HttpGet]
        public async Task<IActionResult> Orders()
        {
            var orders = await _orderRepo.GetAllComponents();

            if (orders == null) 
                throw new NotFoundException("Orders not found", 404);

            return Ok(_mapper.Map<IEnumerable<ExchangeOrderDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderRepo.GetComponent(id);

            if (order == null) 
                throw new NotFoundException("Orders not found", 404);

            return Ok(_mapper.Map<ExchangeOrderDto>(order));
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(ExchangeOrderDto order)
        {
            var newOrder = _mapper.Map<ExchangeOrder>(order);

            var firstBook = await _bookRepo.GetComponent(order.FirstBookId);
            var secondBook = await _bookRepo.GetComponent(order.SecondBookId);

            if(firstBook == null || secondBook == null) 
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            newOrder.FirstBook = firstBook;
            newOrder.SecondBook = secondBook;

            await _orderRepo.AddComponent(newOrder);

            return CreatedAtAction(nameof(_orderRepo.AddComponent), new { id = newOrder.Id }, newOrder);
        }

        [HttpPut]
        public async Task<IActionResult> ModifyOrder(ExchangeOrder order)
        {
            if(await _orderRepo.GetComponent(order.Id) == null) 
                throw new NotFoundException("Order not found", 404);

            await _orderRepo.ModifyComponent(order);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (await _orderRepo.GetComponent(id) == null) 
                throw new NotFoundException("Order not found", 404);

            await _orderRepo.DeleteComponent(id);

            return Ok($"Orded with id {id} was deleted");
        }
    }
}
