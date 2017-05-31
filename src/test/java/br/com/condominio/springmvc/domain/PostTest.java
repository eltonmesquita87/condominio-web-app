package br.com.condominio.springmvc.domain;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import br.com.condominio.springmvc.domain.Post;

import static org.junit.Assert.*;

/**
 *
 * @author elton.mesquita
 */
public class PostTest {

    public PostTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    private Post post;

    @Before
    public void setUp() {
        post = new Post();
        post.setTitle("test title");
        post.setContent("test content");
    }

    @After
    public void tearDown() {
        post = null;
    }

    /**
     * Test of getId method, of class Post.
     */
    @Test
    public void testPojo() {
        assertEquals("test title", post.getTitle());
        assertEquals("test content", post.getContent());
    }

}
