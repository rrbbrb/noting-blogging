package io.github.rrbbrb.blogbackendjava.service;

import io.github.rrbbrb.blogbackendjava.dto.LogInRequest;
import io.github.rrbbrb.blogbackendjava.dto.SignUpRequest;
import io.github.rrbbrb.blogbackendjava.model.User;
import io.github.rrbbrb.blogbackendjava.repository.UserRepository;
import io.github.rrbbrb.blogbackendjava.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    public boolean signUp(SignUpRequest signUpRequest) {
        User user = new User();
//        user.setEmail(signUpRequest.getEmail());
        String username = signUpRequest.getUsername();
        if(userRepository.findByUsername(username) == null) {
            user.setUsername(username);
            user.setEncodedPassword(encodePassword(signUpRequest.getPassword()));
            userRepository.save(user);
            return true;
        } else {
            return false;
        }

    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public AuthenticationResponse logIn(LogInRequest logInRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(logInRequest.getUsername(), logInRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String authenticationToken = jwtProvider.generateToken(authentication);
        return new AuthenticationResponse(authenticationToken, logInRequest.getUsername());
    }

    public Optional<org.springframework.security.core.userdetails.User> getCurrentUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User)SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        return Optional.of(principal);
    }
}
