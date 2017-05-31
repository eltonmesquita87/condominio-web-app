package br.com.condominio.springmvc.test;

import br.com.condominio.springmvc.domain.Post;
import br.com.condominio.springmvc.model.PostForm;

/**
 *
 * @author elton.mesquita
 */
public final class Fixtures {
	
	private Fixtures() {
	      throw new InstantiationError( "Must not instantiate this class" );
	}

    public static Post createPost(String title, String content) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);

        return post;
    }

    public static PostForm createPostForm(String title, String content) {
        PostForm post = new PostForm();
        post.setTitle(title);
        post.setContent(content);

        return post;
    }

}
