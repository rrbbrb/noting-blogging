package io.github.rrbbrb.blogbackendjava.repository;

import io.github.rrbbrb.blogbackendjava.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT * FROM posts WHERE user_id = :id", nativeQuery = true)
    List<Post> findAllByUserId(@Param("id") Long id);
}
