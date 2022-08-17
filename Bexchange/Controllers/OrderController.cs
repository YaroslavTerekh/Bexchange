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
    public class OrderController : ControllerBase
    {
        private readonly IOrdersRepository _orderRepo;
        private readonly IBooksRepository _bookRepo;
        private readonly IMapper _mapper;

        public OrderController(IOrdersRepository contentRepo, IMapper mapper, IBooksRepository bookRepo)
        {
            _orderRepo = contentRepo;
            _mapper = mapper;
            _bookRepo = bookRepo;
        }

        [HttpGet]
        public async Task<IActionResult> Orders()
        {
            try
            {
                var orders = await _orderRepo.GetAllOrders();

                return Ok(_mapper.Map<IEnumerable<ExchangeOrderDto>>(orders));
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            try
            {
                return Ok(_mapper.Map<ExchangeOrderDto>(await _orderRepo.GetOrder(id)));
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(ExchangeOrderDto order)
        {
            try
            {
                var newOrder = _mapper.Map<ExchangeOrder>(order);

                newOrder.FirstBook = await _bookRepo.GetBook(order.FirstBookId);
                newOrder.SecondBook = await _bookRepo.GetBook(order.SecondBookId);

                await _orderRepo.AddOrder(newOrder);

                return CreatedAtAction(nameof(_orderRepo.AddOrder), new { id = newOrder.Id }, newOrder);
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> ModifyOrder(ExchangeOrder order)
        {
            try
            {
                await _orderRepo.ModifyOrder(order);

                return Ok();
            }
            catch (Exception exc)
            {
                return StatusCode(500, exc.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                await _orderRepo.DeleteOrder(id);

                return Ok($"Orded with id {id} was deleted");
            }
            catch (Exception exc)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
