package br.com.condominio.springmvc.test;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Objects;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import br.com.condominio.springmvc.config.AppConfig;
import br.com.condominio.springmvc.config.DataJpaConfig;
import br.com.condominio.springmvc.config.DataSourceConfig;
import br.com.condominio.springmvc.config.JpaConfig;
import br.com.condominio.springmvc.domain.Post;
import br.com.condominio.springmvc.exception.ResourceNotFoundException;
import br.com.condominio.springmvc.model.PostDetails;
import br.com.condominio.springmvc.model.PostForm;
import br.com.condominio.springmvc.repository.PostRepository;
import br.com.condominio.springmvc.service.BlogService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class, DataSourceConfig.class, DataJpaConfig.class, JpaConfig.class})
public class BlogServiceTest {

    private static final Logger LOG = LoggerFactory.getLogger(BlogServiceTest.class);

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private BlogService blogService;

    private Post post;

    public BlogServiceTest() {
    }

    @Before
    public void setUp() {
        postRepository.deleteAll();
        post = postRepository.save(Fixtures.createPost("My first post", "content of my first post"));

        assertNotNull(post.getId());
    }

    @After
    public void tearDown() {
    }

    @Test
    public void testSavePost() {
        PostForm form = new PostForm();
        form.setTitle("saving title");
        form.setContent("saving content");

        PostDetails details = blogService.savePost(form);

        LOG.debug("post details @" + details);
        assertNotNull("saved post id should not be null@", details.getId());
        assertNotNull(details.getId());

        Page<PostDetails> allPosts = blogService.searchPostsByCriteria("", null, new PageRequest(0, 10));
        assertTrue(allPosts.getTotalElements() == 2);

        Page<PostDetails> posts = blogService.searchPostsByCriteria("first", Post.Status.DRAFT, new PageRequest(0, 10));
        assertTrue(posts.getTotalPages() == 1);
        assertTrue(!posts.getContent().isEmpty());
        assertTrue(Objects.equals(posts.getContent().get(0).getId(), post.getId()));

        PostForm updatingForm = new PostForm();
        updatingForm.setTitle("updating title");
        updatingForm.setContent("updating content");
        PostDetails updatedDetails = blogService.updatePost(post.getId(), updatingForm);

        assertNotNull(updatedDetails.getId());
        assertTrue("updating title".equals(updatedDetails.getTitle()));
        assertTrue("updating content".equals(updatedDetails.getContent()));

    }

    @Test(expected = ResourceNotFoundException.class)
    public void testGetNoneExistingPost() {
        blogService.findPostById(1000L);
    }

}
