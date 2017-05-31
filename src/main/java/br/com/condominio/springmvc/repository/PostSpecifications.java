package br.com.condominio.springmvc.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import br.com.condominio.springmvc.domain.Post;

/**
 *
 * @author elton.mesquita
 *
 */
public final class PostSpecifications {
	
	private PostSpecifications() {
	      throw new InstantiationError( "Must not instantiate this class" );
	}

    public static Specification<Post> filterByKeywordAndStatus(final String keyword,final Post.Status status) {
        return (Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(keyword)) {
                predicates.add(
                        cb.or(
                                cb.like(root.get("title"), "%" + keyword + "%"),
                                cb.like(root.get("content"), "%" + keyword + "%")
                        )
                );
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

}
