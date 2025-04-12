package com.tfm.carnavalgo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class DotenvConfig {

   /* PRUEBAS DEBUG
   @Bean
    public Dotenv dotenv() {
        String dotenvPath = System.getProperty("user.dir") + "/carnavalGo_Backend/.env";

        if (Files.exists(Paths.get(dotenvPath))) {
            return Dotenv.configure().directory(System.getProperty("user.dir") + "/carnavalGo_Backend").load();
        } else {
            return null; 
        }
    }*/

    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure().ignoreIfMissing().load();
    }
}