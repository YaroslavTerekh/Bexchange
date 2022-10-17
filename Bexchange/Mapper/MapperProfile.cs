using AutoMapper;
using Bexchange.API.DTOs;
using Bexchange.Domain.Models;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.DTOs;

namespace BexchangeAPI.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<AddressInfo, AddressInfoDto>();
            CreateMap<Book, BookDto>();
            CreateMap<ExchangeOrder, ExchangeOrderDto>();            
            CreateMap<User, UserDto>();

            CreateMap<CommentDto, Comment>()
                .ForMember(dest => dest.Message, opt => opt.MapFrom(c => c.Message))
                .ForMember(dest => dest.Author, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<BookDto, Book>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(b => b.Id))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(b => b.Image))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(b => b.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(b => b.Description))
                .ForMember(dest => dest.State, opt => opt.Ignore())
                .ForMember(dest => dest.GenreId, opt => opt.MapFrom(b => b.GenreId));

            CreateMap<ExchangeOrderDto, ExchangeOrder>()
                    .ForMember(dest => dest.FirstBookId, opt => opt.MapFrom(o => o.FirstBookId))
                    .ForMember(dest => dest.SecondBookId, opt => opt.MapFrom(o => o.SecondBookId))
                    .ForMember(dest => dest.State, opt => opt.Ignore())
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(e => e.Id));
        }
    }
}
