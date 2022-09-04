using AutoMapper;
using BexchangeAPI.Domain.CustomExceptions;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.DTOs;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BexchangeAPI.Controllers
{
    [Authorize]
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
            if (ModelState.IsValid)
            {
                var newOrder = _mapper.Map<ExchangeOrder>(order);

                var firstBook = await _bookRepo.GetComponent(order.FirstBookId);
                var secondBook = await _bookRepo.GetComponent(order.SecondBookId);

                if(firstBook == null || secondBook == null) 
                    throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

                newOrder.FirstBook = firstBook;
                newOrder.SecondBook = secondBook;

                await _orderRepo.AddComponent(newOrder);

                return Created(Request.Path, new { newOrder.Id });
            }

            return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
        }

        [HttpPut]
        public async Task<IActionResult> ModifyOrder(ExchangeOrderDto order)
        {
            if (ModelState.IsValid)
            {
                if (await _orderRepo.GetComponent(order.Id) == null) 
                    throw new NotFoundException("Order not found", 404);

                var mappedOrder = _mapper.Map<ExchangeOrder>(order);

                mappedOrder.FirstBook = await _bookRepo.GetComponent(order.FirstBookId);
                mappedOrder.SecondBook = await _bookRepo.GetComponent(order.SecondBookId);

                await _orderRepo.ModifyComponent(mappedOrder);

                return Ok();
            }

            return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
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
