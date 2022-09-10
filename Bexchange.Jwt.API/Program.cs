using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Domain;
using BexchangeAPI.Infrastructure;
using BexchangeAPI.Infrastructure.Repositories;
using BexchangeAPI.Infrastructure.DtbContext;
using Microsoft.AspNetCore.Identity;
using Bexchange.Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContextsCustom(builder.Configuration);
builder.Services.AddTransient<IUsersRepository<User>, UsersRepository>();

builder.Services.AddCors();

builder.Services.AddIdentity<User, ApplicationRole>()
    .AddEntityFrameworkStores<ContentDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 4;
    options.Password.RequiredUniqueChars = 0;
});

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
