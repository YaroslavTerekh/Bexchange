﻿using Bexchange.Domain.Models;
using BexchangeAPI.Domain.Annotations;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace BexchangeAPI.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        //[Required(ErrorMessage = "'Title' field is empty")]
        //[MaxLength(100, ErrorMessage = "Too long title")]
        //[ValidBook(ErrorMessage = "Title must start with big letter")]
        public string Title { get; set; }
        //[Required(ErrorMessage = "'Description' field is empty")]
        //[MaxLength(500, ErrorMessage = "Too long description (500 max)")]
        //[MinLength(50, ErrorMessage = "Too short description (50 min)")]
        //[ValidBook(ErrorMessage = "Description must start with big letter")]
        public string Description { get; set; }
        //[Required(ErrorMessage = "'Author' field is empty")]
        public Author Author { get; set; }
        //[Required(ErrorMessage = "'Genre' field is empty")]
        public int GenreId { get; set; }
        public Genre? Genre { get; set; }
        //[Required(ErrorMessage = "No photo uploaded")]
        public Image? Image { get; set; }
        public ICollection<Comment>? Comments { get; set; }
        //[Required(ErrorMessage = "No User applied")]
        public int UserId { get; set; }
        public State state { get; set; }
    }
}
