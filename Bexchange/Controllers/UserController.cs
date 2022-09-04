using AutoMapper;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BexchangeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //private readonly IContentRepository<ExchangeOrder> _orderRepo;
        //private readonly IContentRepository<Book> _bookRepo;
        //private readonly IMapper _mapper;

        //public UserController(IContentRepository<ExchangeOrder> contentRepo, IMapper mapper, IContentRepository<Book> bookRepo)
        //{
        //    _orderRepo = contentRepo;
        //    _mapper = mapper;
        //    _bookRepo = bookRepo;
        //}
    }
}
