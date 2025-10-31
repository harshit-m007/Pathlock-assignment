FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["MiniProjectManager.Api.csproj", "./"]
RUN dotnet restore "MiniProjectManager.Api.csproj"
COPY . .
RUN dotnet build "MiniProjectManager.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MiniProjectManager.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MiniProjectManager.Api.dll"]

