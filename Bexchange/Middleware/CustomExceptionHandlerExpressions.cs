namespace Bexchange.Middleware
{
    public static class CustomExceptionHandlerExpressions
    {
        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionHandler>();
        }
    }
}
