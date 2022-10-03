package com.opensource.pharraxz.configs;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SwaggerConfig implements WebMvcConfigurer {

    private static final String GROUP_ANY = "any";
    private static final String PATH_ANY = "/**";

    @Bean
    public GroupedOpenApi api() {
        return GroupedOpenApi.builder()
                .group(GROUP_ANY)
                .pathsToMatch(PATH_ANY)
                .build();
    }

}
