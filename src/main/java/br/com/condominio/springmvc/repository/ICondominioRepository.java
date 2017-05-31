package br.com.condominio.springmvc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condominio.springmvc.domain.Condominio;

public interface ICondominioRepository extends JpaRepository<Condominio, Long> {
	
}
