# Diese Stufe wird für die Basis-Image-Konfiguration verwendet (ASP.NET Core Runtime).
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base  # Verwenden eines Linux-kompatiblen .NET Runtime-Images
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Diese Stufe wird verwendet, um das Dienstprojekt zu erstellen.
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build  # .NET SDK auf Linux-Basis
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["BlazorApp2/BlazorApp2.csproj", "BlazorApp2/"]
RUN dotnet restore "./BlazorApp2/BlazorApp2.csproj"
COPY . .
WORKDIR "/src/BlazorApp2"
RUN dotnet build "./BlazorApp2.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Diese Stufe wird verwendet, um das Dienstprojekt zu veröffentlichen.
FROM build AS publish
RUN dotnet publish "./BlazorApp2.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Diese Stufe wird für den Produktionsbetrieb verwendet (Endversion).
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BlazorApp2.dll"]
