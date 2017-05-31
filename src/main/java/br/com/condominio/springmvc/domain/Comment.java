package br.com.condominio.springmvc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "comments")
@JsonIgnoreProperties("post")
public class Comment extends BaseEntity {
  
	private static final long serialVersionUID = -6864595688027077414L;

	@Column(name = "content")
    private String content;

    @JoinColumn(name = "post_id")
    @ManyToOne(optional = false)
    private Post post;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @Override
    public String toString() {
        return "Comment{" + "id=" + id + ", content=" + content + ", post=" + post.getId() + ", createdDate=" + createdDate + '}';
    }

}
