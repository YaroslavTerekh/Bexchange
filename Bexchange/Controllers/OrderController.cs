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
    public class OrderController : ControllerBase
    {
        private readonly IOrderContentRepository<ExchangeOrder> _orderRepo;
        private readonly IBookContentRepository<Book> _bookRepo;
        private readonly IMapper _mapper;

        public OrderController(IOrderContentRepository<ExchangeOrder> contentRepo, IMapper mapper, IBookContentRepository<Book> bookRepo)
        {
            _orderRepo = contentRepo;
            _mapper = mapper;
            _bookRepo = bookRepo;
        }

        [HttpGet]
        public async Task<IActionResult> Orders(CancellationToken token)
        {
            var orders = await _orderRepo.GetAllComponentsAsync(token);

            if (orders == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderRepo.GetComponentAsync(id);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(order);
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserOrders(int id)
        {
            var order = await _orderRepo.GetUserComponentsAsync(id);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(order);
        }

        [HttpGet("user/{id}/outgoing")]
        public async Task<IActionResult> GetUserOutgoingOrders(int id)
        {
            var order = await _orderRepo.GetUserOutgoingOrdersAsync(id);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(order);
        }

        [HttpGet("user/{id}/incoming")]
        public async Task<IActionResult> GetUserImcomingOrders(int id)
        {
            var order = await _orderRepo.GetUserIncomingOrdersAsync(id);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(order);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddOrder(ExchangeOrderDto order)
        {
            var newOrder = _mapper.Map<ExchangeOrder>(order);

            var firstBook = await _bookRepo.GetComponentAsync(order.FirstBookId);
            var secondBook = await _bookRepo.GetComponentAsync(order.SecondBookId);

            if (firstBook == null || secondBook == null)
                throw new NotFoundException("Books not found", (int)HttpStatusCode.NotFound);

            if (firstBook.State != State.Verified || secondBook.State != State.Verified)
                return BadRequest();

            newOrder.FirstBook = firstBook;
            newOrder.SecondBook = secondBook;

            await _orderRepo.AddComponentAsync(newOrder);

            return Created(Request.Path, new { newOrder.Id });
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

        [HttpPatch("state/accept/{id}")]
        public async Task<IActionResult> AcceptOrder(int id)
        {
            try
            {
                await _orderRepo.AcceptOrderAsync(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpPatch("state/decline/{id}")]
        public async Task<IActionResult> DeclineOrder(int id)
        {
            try
            {
                await _orderRepo.DeclineOrderAsync(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (await _orderRepo.GetComponentAsync(id) == null)
                throw new NotFoundException("Order not found", (int)HttpStatusCode.NotFound);

            await _orderRepo.DeleteComponentAsync(id);

            return NoContent();
        }
    }
}
