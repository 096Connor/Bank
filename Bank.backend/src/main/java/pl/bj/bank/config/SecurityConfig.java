package pl.bj.bank.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())          // wyłącz CSRF (blokuje POST)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()       // pozwól na WSZYSTKIE requesty
                );

        return http.build();
    }
}
