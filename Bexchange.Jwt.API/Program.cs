using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure;
using BexchangeAPI.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContextsCustom(builder.Configuration);
builder.Services.AddTransient<IUsersRepository<User>, UsersRepository>();

builder.Services.AddCors();

//Add Cookie
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(config =>
{
    config.WithOrigins("https://localhost:1234", "http://localhost:3334");
    config.WithMethods("Register", "Login", "RefreshToken");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
