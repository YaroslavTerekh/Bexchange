using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;

namespace Bexchange.Middleware
{
    public class CustomExceptionHandler
    {
        private readonly RequestDelegate _next;

        public CustomExceptionHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exc)
            {
                await HandleException(exc, context);
            }
        }

        private Task HandleException(Exception exception, HttpContext context)
        {
            var code = HttpStatusCode.InternalServerError;
            var responce = String.Empty;

            switch (exception)
            {
                case ValidationException validationException:
                    responce = JsonSerializer.Serialize(validationException);
                    code = HttpStatusCode.BadRequest;
                    break;
                case FileNotFoundException fileNotFoundException:
                    responce = JsonSerializer.Serialize(fileNotFoundException);
                    code = HttpStatusCode.NotFound;
                    break;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(responce);
        }
    }
}
