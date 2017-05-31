package br.com.condominio.springmvc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.Size;


@Entity
@Table(name = "posts")
public class Post extends BaseEntity {

	private static final long serialVersionUID = 1L;

	public enum Status {
        DRAFT,
        PUBLISHED
    }

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    @Size(max = 2000)
    private String content;

    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private Status status = Status.DRAFT;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Post{" + "id=" + id + ", title=" + title + ", content=" + content + ", status=" + status + '}';
    }

}
