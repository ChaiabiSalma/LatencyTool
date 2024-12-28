package projet.latency_tool.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@EnableWebSecurity
//spécifier exactement quelles URL nécessitent une authentification, définir des pages de connexion/déconnexion personnalisées, et configurer d'autres aspects comme les rôles d'utilisateur.
// la configuration de la sécurité de notre application Spring Boot.
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Désactive CSRF pour simplifier les tests des requêtes POST
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/pages/LoginPage", "/pages/RegisterPage").permitAll()
                        .requestMatchers("/api/targets/**","/latency/measure","/Recommendations").permitAll() // Autorise les accès à tous les endpoints sous /api/targets
                        .anyRequest().authenticated() // Toutes les autres URLs nécessitent une authentification
                )
                .formLogin(form -> form
                        .loginPage("/pages/LoginPage")
                        .defaultSuccessUrl("/pages/HomePage", true)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/pages/WelcomePage")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

