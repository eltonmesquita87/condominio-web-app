package br.com.condominio.springmvc;

public final class Constants {

    /**
     * prefix of REST API
     */
	
    public static final String URI_API = "/api";

    public static final String URI_POSTS = "/posts";

    public static final String URI_COMMENTS = "/comments";
    
    public static final String URI_CONDOMINIOS = "/condominios";
    
    private Constants() {
        throw new InstantiationError( "Must not instantiate this class" );
    }
    
}
