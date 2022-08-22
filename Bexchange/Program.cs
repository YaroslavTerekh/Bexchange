using Bexchange.Infrastructure;
using Bexchange.Infrastructure.DtbContext;
using Bexchange.Infrastructure.Repositories;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Bexchange.Domain.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Add SQL Server
builder.Services.AddDbContextsCustom(builder.Configuration);
//Depency Injection
builder.Services.AddTransient<IContentRepository<Book>, BooksRepository>();
builder.Services.AddTransient<IContentRepository<ExchangeOrder>, OrdersRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
