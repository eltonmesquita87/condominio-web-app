package br.com.condominio.springmvc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {"br.com.condominio.springmvc"})
public class DataJpaConfig {
	
}
