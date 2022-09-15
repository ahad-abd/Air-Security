package com.testingdemo.AirSecurityBackend.Services;
import com.testingdemo.AirSecurityBackend.JpaRepository.UserRepository;
import com.testingdemo.AirSecurityBackend.Model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
@Slf4j
public class UserAuthService implements UserDetailsService, UserServiceInterface {


    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userName){

        User user=userRepository.findById(userName).orElse(null);
        if(user == null){
            log.warn("Username Not found Exception");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmailId(),user.getPassWord(),this.getAuthorities(user));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(User user) {
        List<GrantedAuthority>list=new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_"+user.getRole()));
        return list;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword(){return null;}

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }


}

