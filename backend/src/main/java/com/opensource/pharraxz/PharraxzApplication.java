package com.opensource.pharraxz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.opensource.pharraxz.configs.properties")
public class PharraxzApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharraxzApplication.class, args);
	}

}
