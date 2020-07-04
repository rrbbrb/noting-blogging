package io.github.rrbbrb.blogbackendjava.controller;

import io.github.rrbbrb.blogbackendjava.dto.LogInRequest;
import io.github.rrbbrb.blogbackendjava.dto.SignUpRequest;
import io.github.rrbbrb.blogbackendjava.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity signUp(@RequestBody SignUpRequest signUpRequest) {
        authService.signUp(signUpRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/log-in")
    public String logIn(@RequestBody LogInRequest logInRequest) {
        return authService.logIn(logInRequest);
    }
}
