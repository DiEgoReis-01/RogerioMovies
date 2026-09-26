package com.github.jonascaetanosz.embedmovies.tv;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import okhttp3.OkHttpClient;
import okhttp3.Headers;
import okhttp3.Request;
import okhttp3.Response;

import org.jsoup.select.Elements;

import com.github.jonascaetanosz.embedmovies.embedMoviesConfig;
import com.github.jonascaetanosz.embedmovies.tv.models.Stream;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.Jsoup;

import java.net.MalformedURLException;
import java.net.URISyntaxException;

import java.io.IOException;

import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class streamsAvailables {
    
    public static List<Stream> getStreams(String tmdbID, String season, String episode ) {
        try {

            URL baseUrl = embedMoviesConfig.getUrl("players");
            String apiEndpoint = String.format("?id=%s&type=tv&season=%s&episode=%s", tmdbID, season, episode);
            URL finaUrl = new URI(baseUrl.toString() + apiEndpoint).toURL();
            Map<String, String> headersMap = embedMoviesConfig.getHeaders("players");
            Headers headers = Headers.of(headersMap);
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder().url(finaUrl).headers(headers).build();
            Response response = null;

            for (int i = 0; i < 5; i++){
                try {
                    response = client.newCall(request).execute();
                    if (response.isSuccessful() && response.body() != null) break;
                    response.close();
                    response = null;
                } catch (Exception e) {
                    System.out.println("ERRO AO PROCESSAR PLAYERS SERIES: " + e.getMessage()) ;
                }
            }
            if (response == null) throw new IOException("O provedor de players não respondeu.");
            String responseContent;
            Response responseToRead = response;
            try (responseToRead) {
                responseContent = responseToRead.body().string();
            }
            List<Stream> streams = new ArrayList<>();
            Document document = Jsoup.parse( responseContent );
            String episodeTitle = document.select(".info-text").text();

            Elements buttonsPlayer = document.select(".player-option[data-embed]");
            
            for (Element button : buttonsPlayer){
                Element nameElement = button.selectFirst(".player-name");
                Element descriptionElement = button.selectFirst(".player-details");
                String streamName = nameElement == null ? "Player" : nameElement.text();
                String streamDescription = descriptionElement == null ? "" : descriptionElement.text();
                String streamUrl = decodeEmbedUrl(button.attr("data-embed"));
                if (streamUrl.isBlank()) continue;
                Stream stream = new Stream(episodeTitle, streamDescription, streamName, streamUrl);
                streams.add(stream);
                
            }
            return streams;

        } catch (MalformedURLException | URISyntaxException e) {
            System.err.println("ERRO A MONTAR URL PLAYERS BASE SERIES:" + e.getMessage());
        } catch (IOException e){
            System.err.println("ERRO AO PEGAR PLAYERS SERIES:" + e.getMessage());
    }
    return null;
}
    private static String decodeEmbedUrl(String encodedUrl) {
        try {
            return new String(Base64.getDecoder().decode(encodedUrl), StandardCharsets.UTF_8);
        } catch (IllegalArgumentException exception) {
            return "";
        }
    }
}

