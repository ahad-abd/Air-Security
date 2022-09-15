package com.testingdemo.AirSecurityBackend.Services;
import com.testingdemo.AirSecurityBackend.Model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Collection;
public interface UserServiceInterface extends UserDetails {

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    Collection<? extends GrantedAuthority>getAuthorities(User user);
}
