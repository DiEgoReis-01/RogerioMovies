package com.github.jonascaetanosz.embedmovies;

import com.github.jonascaetanosz.embedmovies.filmes.models.Stream;
import com.github.jonascaetanosz.embedmovies.filmes.streamsAvailables;
import com.github.jonascaetanosz.embedmovies.tmdb.TmdbConfig;
import com.github.jonascaetanosz.embedmovies.tmdb.Trending;
import com.github.jonascaetanosz.embedmovies.tmdb.models.Media;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URL;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class CatalogServer {
    private static final Gson GSON = new Gson();
    private static final Pattern STREAMS_PATH = Pattern.compile("/api/movies/(\\d+)/streams");

    private CatalogServer() {}

    public static void main(String[] args) throws IOException {
        String apiKey = System.getenv("TMDB_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Configure a variável de ambiente TMDB_API_KEY antes de iniciar.");
        }
        TmdbConfig.setApiKey(apiKey);

        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/api/movies", CatalogServer::handleMovies);
        server.setExecutor(Executors.newCachedThreadPool());
        server.start();
        System.out.printf("API de filmes disponível em http://localhost:%d/api/movies%n", port);
    }

    private static void handleMovies(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            sendJson(exchange, 405, new ApiError("Método não permitido."));
            return;
        }

        try {
            String path = exchange.getRequestURI().getPath();
            if ("/api/movies".equals(path)) {
                List<MovieCard> movies = Trending.all().stream()
                    .filter(media -> "movie".equals(media.getMedia_type()))
                    .map(CatalogServer::toMovieCard)
                    .filter(Objects::nonNull)
                    .toList();
                sendJson(exchange, 200, movies);
                return;
            }

            Matcher matcher = STREAMS_PATH.matcher(path);
            if (matcher.matches()) {
                List<StreamOption> streams = streamsAvailables.getStreams(matcher.group(1)).stream()
                    .map(CatalogServer::toStreamOption)
                    .filter(Objects::nonNull)
                    .toList();
                sendJson(exchange, 200, streams);
                return;
            }

            sendJson(exchange, 404, new ApiError("Rota não encontrada."));
        } catch (Exception exception) {
            exception.printStackTrace();
            sendJson(exchange, 502, new ApiError("A biblioteca não conseguiu consultar os dados agora."));
        }
    }

    private static MovieCard toMovieCard(Media media) {
        URL posterUrl = media.getPoster_url();
        if (posterUrl == null || media.getId() == null || media.getName() == null) return null;
        return new MovieCard(
            media.getId(),
            media.getName(),
            posterUrl.toString(),
            media.getRelease_date(),
            media.getVote_average()
        );
    }

    private static StreamOption toStreamOption(Stream stream) {
        URL url = stream.getStreamUrl();
        if (url == null) return null;
        return new StreamOption(stream.getStreamName(), stream.getStreamDescription(), url.toString());
    }

    private static void sendJson(HttpExchange exchange, int status, Object body) throws IOException {
        byte[] response = GSON.toJson(body).getBytes(java.nio.charset.StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.sendResponseHeaders(status, response.length);
        try (var output = exchange.getResponseBody()) {
            output.write(response);
        }
    }

    private record MovieCard(String id, String title, String posterUrl, String releaseDate, double voteAverage) {}
    private record StreamOption(String name, String description, String url) {}
    private record ApiError(String message) {}
}