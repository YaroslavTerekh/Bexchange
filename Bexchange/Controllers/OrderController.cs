using AutoMapper;
using BexchangeAPI.Domain.CustomExceptions;
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
            var orders = await _orderRepo.GetAllComponentsAsync();

            if (orders == null) 
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<ExchangeOrderDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderRepo.GetComponentAsync(id);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<ExchangeOrderDto>(order));
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserOrders(int id)
        {
            var order = await _orderRepo.GetUserComponentsAsync(id);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(_mapper.Map<IEnumerable<ExchangeOrderDto>>(order));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddOrder(ExchangeOrderDto order)
        {
            if (ModelState.IsValid)
            {
                var newOrder = _mapper.Map<ExchangeOrder>(order);

                var firstBook = await _bookRepo.GetComponentAsync(order.FirstBookId);
                var secondBook = await _bookRepo.GetComponentAsync(order.SecondBookId);

                if(firstBook == null || secondBook == null) 
                    throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

                newOrder.FirstBook = firstBook;
                newOrder.SecondBook = secondBook;

                await _orderRepo.AddComponentAsync(newOrder);

                return Created(Request.Path, new { newOrder.Id });
            }

            return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
        }

        [HttpPut("modify")]
        public async Task<IActionResult> ModifyOrder(ExchangeOrderDto order)
        {
            if (ModelState.IsValid)
            {
                if (await _orderRepo.GetComponentAsync(order.Id) == null) 
                    throw new NotFoundException("Order not found", (int)HttpStatusCode.NotFound);

                var mappedOrder = _mapper.Map<ExchangeOrder>(order);

                mappedOrder.FirstBook = await _bookRepo.GetComponentAsync(order.FirstBookId);
                mappedOrder.SecondBook = await _bookRepo.GetComponentAsync(order.SecondBookId);

                await _orderRepo.ModifyComponentAsync(mappedOrder);

                return Ok();
            }

            return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (await _orderRepo.GetComponentAsync(id) == null) 
                throw new NotFoundException("Order not found", (int)HttpStatusCode.NotFound);

            await _orderRepo.DeleteComponentAsync(id);

            return Ok($"Orded with id {id} was deleted");
        }

        private int GetUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = identity.FindFirst("id").Value;
            return Int32.Parse(id);
        }
    }
}
