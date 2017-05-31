package br.com.condominio.springmvc.api.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.condominio.springmvc.Constants;
import br.com.condominio.springmvc.domain.Condominio;
import br.com.condominio.springmvc.model.ResponseMessage;
import br.com.condominio.springmvc.service.CondominioService;

@RestController
@RequestMapping(value = Constants.URI_API + Constants.URI_CONDOMINIOS)
public class CondominioController {
	
	//private static final Logger log = LoggerFactory.getLogger(CondominioController.class);
	
	@Autowired
	private CondominioService condominioService;	
	
	@RequestMapping(method = RequestMethod.POST)    
    public ResponseEntity<ResponseMessage> cadastrar(@RequestBody Condominio form) {		
		Condominio condominio = condominioService.save(form);
		System.out.println(condominio.getNome());
		
		HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(Constants.URI_API + Constants.URI_CONDOMINIOS + "/{id}")
                .buildAndExpand(condominio.getId())
                .toUri()
        );
        
        return new ResponseEntity<>(ResponseMessage.success("condominio.created"), headers, HttpStatus.OK);
    }
	
	@RequestMapping(method = RequestMethod.PUT)
	public Condominio cadastro() throws Exception{		
		Condominio cond = new Condominio();
		cond.setNome("elton");
		
		return cond;
	}
	

}
