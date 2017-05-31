package br.com.condominio.springmvc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.condominio.springmvc.domain.Condominio;
import br.com.condominio.springmvc.exception.ResourceNotFoundException;
import br.com.condominio.springmvc.repository.ICondominioRepository;

@Service
@Transactional
public class CondominioService {
	
	@Autowired
	private ICondominioRepository condominioRepository;
	
	@Autowired
	public CondominioService(ICondominioRepository condominioRepository) {
		this.condominioRepository = condominioRepository;
	}
	
	public Condominio save(Condominio dto){		
		Condominio condominio = condominioRepository.save(dto);
		return condominio;
	}
	
	public void delete (Long id){		
		Condominio condominio = condominioRepository.findOne(id);
		
		if (condominio == null) {
            throw new ResourceNotFoundException(id);
        }		
		condominioRepository.delete(condominio);
	}
	

}
