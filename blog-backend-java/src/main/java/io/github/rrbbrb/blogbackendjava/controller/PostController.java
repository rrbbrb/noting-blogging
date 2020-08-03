package io.github.rrbbrb.blogbackendjava.controller;

import io.github.rrbbrb.blogbackendjava.dto.PostDto;
import io.github.rrbbrb.blogbackendjava.service.PostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostsService postsService;

    @PostMapping("/new")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto) {
        postsService.createPost(postDto);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> listAllPosts() {
        List<PostDto> postDtos = postsService.listAllPosts();
        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> readSinglePost(@PathVariable @RequestBody Long id) {
        return new ResponseEntity<>(postsService.readSinglePost(id), HttpStatus.OK);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<PostDto>> listAllPostsByUser(@PathVariable @RequestBody String username) {
        List<PostDto> postDtos = postsService.listAllPostsByUser(username);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}/user")
    public ResponseEntity<String> findUserByPost(@PathVariable @RequestBody Long id) {
        String username = postsService.findUserByPost(id);
        return new ResponseEntity<>(username, HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Boolean> editPost(@PathVariable @RequestBody Long id, @RequestBody PostDto postDto) {
        if(postsService.editPost(id, postDto)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deletePost(@PathVariable @RequestBody Long id) {
        if(postsService.deletePost(id)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
    }
}
