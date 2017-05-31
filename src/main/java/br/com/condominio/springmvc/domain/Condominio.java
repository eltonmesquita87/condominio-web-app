package br.com.condominio.springmvc.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


@Entity
@Table(name = "condominios")
@JsonInclude(value=Include.NON_NULL)
public class Condominio extends BaseEntity {

	private static final long serialVersionUID = -2927146780121521716L;
	
	@Column
	@Size(max=200)
	private String nome;
	
	@Column
	@Size(max=14)
	private String cnpj;
	
	@Column
	private Date construidoEm;
	
	@Column
	private Integer totalUnidade;
	
	@Column
	private Integer qdtUnidade;
	
	@Column
	private String cep;
	
	@Column
	private String cidade;
	
	@Column
	private String uf;
	
	@Column
	private String bairro;
	
	@Column
	private String numero;
	
	@Column
	private String complemento;
	
	@Column
	private String telefone;
	
	@Column
	private String email;	
	
	public Condominio() {
		super();
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public Date getConstruidoEm() {
		return construidoEm;
	}

	public void setConstruidoEm(Date construidoEm) {
		this.construidoEm = construidoEm;
	}

	public Integer getTotalUnidade() {
		return totalUnidade;
	}

	public void setTotalUnidade(Integer totalUnidade) {
		this.totalUnidade = totalUnidade;
	}

	public Integer getQdtUnidade() {
		return qdtUnidade;
	}

	public void setQdtUnidade(Integer qdtUnidade) {
		this.qdtUnidade = qdtUnidade;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Condominio [nome=" + nome + ", cnpj=" + cnpj + ", construidoEm=" + construidoEm + ", totalUnidade="
				+ totalUnidade + ", qdtUnidade=" + qdtUnidade + ", cep=" + cep + ", cidade=" + cidade + ", uf=" + uf
				+ ", bairro=" + bairro + ", numero=" + numero + ", complemento=" + complemento + ", telefone="
				+ telefone + ", email=" + email + "]";
	}
	
	
	

		
	

}
