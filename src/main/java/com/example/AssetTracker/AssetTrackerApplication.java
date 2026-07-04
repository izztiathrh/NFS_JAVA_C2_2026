package com.example.AssetTracker;

//mvn spring boot: run
//local: run -Dspring-boot.run.profiles=local
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AssetTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssetTrackerApplication.class, args);
	}

}
