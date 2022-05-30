package com.opensource.pharraxz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;

@EnableR2dbcAuditing
@SpringBootApplication
public class PharraxzApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharraxzApplication.class, args);
	}

}
