package io.github.rrbbrb.blogbackendjava.service;

import io.github.rrbbrb.blogbackendjava.dto.PostDto;
import io.github.rrbbrb.blogbackendjava.exception.PostNotFoundException;
import io.github.rrbbrb.blogbackendjava.exception.UserNotFoundException;
import io.github.rrbbrb.blogbackendjava.model.Post;
import io.github.rrbbrb.blogbackendjava.repository.PostRepository;
import io.github.rrbbrb.blogbackendjava.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostsService {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;


    public void createPost(PostDto postDto) {
        Post post = new Post();
        post.setDateCreated(LocalDateTime.now());
        mapFromDtoToPost(post, postDto);
        User currentUser = getCurrentUser();
        post.setUser(getCurrentUserFromDB(currentUser));
        postRepository.save(post);
    }

    public List<PostDto> listAllPosts() {
        List<Post> posts = postRepository.findAll(Sort.by("lastUpdated").descending());
        return posts.stream().map(this::mapFromPostToDto).collect(Collectors.toList());
    }

    public PostDto readSinglePost(Long id) {
        Post post = findPostById(id);
        return mapFromPostToDto(post);
    }

    public boolean editPost(Long id, PostDto postDto) {
        if(matchPostAuthor(id)) {
            Post post = findPostById(id);
            mapFromDtoToPost(post, postDto);
            return true;
        }
        return false;
    }

    public boolean deletePost(Long id) {
        if(matchPostAuthor(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }

//    ----- helper methods -----

    public boolean matchPostAuthor(Long id) {
        Post post = findPostById(id);
        User currentUser = getCurrentUser();
        io.github.rrbbrb.blogbackendjava.model.User postAuthor = post.getUser();
        io.github.rrbbrb.blogbackendjava.model.User currentUserFromDB = getCurrentUserFromDB(currentUser);

        return postAuthor.equals(currentUserFromDB) && post != null;
    }

    public Post findPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post with id " + id + " not found"));
        return post;
    }

    public User getCurrentUser() {
        User currentUser = authService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("No user logged in"));
        return currentUser;
    }

    public io.github.rrbbrb.blogbackendjava.model.User getCurrentUserFromDB(User currentUser) {
        io.github.rrbbrb.blogbackendjava.model.User currentUserFromDB = userRepository.findByUsername(currentUser.getUsername()).orElseThrow(() ->
                new UserNotFoundException("No user logged in found"));
        return currentUserFromDB;
    }

    private void mapFromDtoToPost(Post post, PostDto postDto) {
        post.setTitle(postDto.getTitle());
        post.setBodyText(postDto.getBodyText());
        post.setLastUpdated(LocalDateTime.now());
    }

    private PostDto mapFromPostToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setBodyText(post.getBodyText());
        postDto.setUser(post.getUser());
        postDto.setDateCreated(post.getDateCreated());
        postDto.setLastUpdated(post.getLastUpdated());
        return postDto;
    }
    

}
