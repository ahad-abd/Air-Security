package com.testingdemo.AirSecurityBackend.Services;

import com.testingdemo.AirSecurityBackend.JpaRepository.UserRepository;
import com.testingdemo.AirSecurityBackend.Model.Login;
import com.testingdemo.AirSecurityBackend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    public String Login(Login login)
    {
        String emailid= login.getUsername();
        User check=userRepository.findById(emailid).orElse(null);
        if(check!=null)
        {
            return "sucess";
        }
        return "failed to login";
    }

    public String Signup(User user)
    {
        String emailId=user.getEmailId();
        User check=userRepository.findById(emailId).orElse(null);
        if(check==null)
        {
            userRepository.save(user);
            return "User added successfully";
        }
        return "Email already Exist";
    }

    public List<User> getall()
    {
        return userRepository.findAll();
    }
}
