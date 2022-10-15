using AutoMapper;
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
        private readonly IUserService _userService;

        public OrderController(IOrderContentRepository<ExchangeOrder> contentRepo, IMapper mapper, 
            IBookContentRepository<Book> bookRepo, IUserService userService)
        {
            _orderRepo = contentRepo;
            _mapper = mapper;
            _bookRepo = bookRepo;
            _userService = userService;
        }

        [HttpGet] 
        public async Task<IActionResult> Orders(CancellationToken token)
        {
            var orders = await _orderRepo.GetAllComponentsAsync(token);

            if (orders == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(orders);
        }

        [HttpGet("user/{id}")] 
        public async Task<IActionResult> GetUserOrders(int id)
        {
            var order = await _orderRepo.GetUserComponentsAsync(id);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(order);
        }

        [HttpGet("user/outgoing")] 
        public async Task<IActionResult> GetUserOutgoingOrders()
        {
            var order = await _orderRepo.GetUserOutgoingOrdersAsync(_userService, HttpContext);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(order);
        }

        [HttpGet("user/incoming")] 
        public async Task<IActionResult> GetUserImcomingOrders()
        {
            var order = await _orderRepo.GetUserIncomingOrdersAsync(_userService, HttpContext);

            if (order == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(order);
        }

        [HttpGet("user/succeded")]
        public async Task<IActionResult> GetUserSuccededOrders()
        {
            var orders = await _orderRepo.GetUserSuceededOrdersAsync(_userService, HttpContext);
            
            if (orders == null)
                throw new NotFoundException("Orders not found", (int)HttpStatusCode.NotFound);

            return Ok(orders);
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

        [HttpPatch("success/{id}")] 
        public async Task<IActionResult> SuccessOrder(int id) 
        {
            await _orderRepo.SuccessOrderAsync(id, _userService, HttpContext);

            return Ok();
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
