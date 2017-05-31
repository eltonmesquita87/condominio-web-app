package br.com.condominio.springmvc.api.post;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.condominio.springmvc.Constants;
import br.com.condominio.springmvc.service.BlogService;

@RestController
@RequestMapping(value = Constants.URI_API + Constants.URI_COMMENTS)
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private BlogService blogService;

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<Void> deleteComment(@PathVariable("id") Long id) {
        if (log.isDebugEnabled()) {
            log.debug("get comments of post id @" + id);
        }

        blogService.deleteCommentById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
