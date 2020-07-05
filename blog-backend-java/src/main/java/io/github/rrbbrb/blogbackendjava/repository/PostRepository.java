package io.github.rrbbrb.blogbackendjava.repository;

import io.github.rrbbrb.blogbackendjava.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {


}
