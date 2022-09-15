package com.testingdemo.AirSecurityBackend.Controller;


import com.testingdemo.AirSecurityBackend.JpaRepository.UserRepository;
import com.testingdemo.AirSecurityBackend.Model.Login;
import com.testingdemo.AirSecurityBackend.Model.User;
import com.testingdemo.AirSecurityBackend.Services.UserServices;
import com.testingdemo.AirSecurityBackend.Util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin(origins ={ "http://localhost:19006/","http://103.92.100.130"})
//@CrossOrigin(origins ="*", allowedHeaders ="*", maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@CrossOrigin(origins = {"exp://192.168.173.228:19000", "http://localhost:19000" , "http://localhost:19006"})
@RestController
@Slf4j
public class UserController {

    @Autowired
    private UserServices userServices;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository ;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String LoginCheck(@RequestBody Login login)
    {
        return userServices.Login(login);
    }

    @RequestMapping(value="/signup",method=RequestMethod.POST)
    public String SigninCheck(@RequestBody User user)
    {
        return userServices.Signup(user);
    }

    @GetMapping(value = "/getall")
    public List<User>Findall()
    {
        return userServices.getall();
    }



    @PostMapping("/authenticate")
    public String GenerateToken(@RequestBody Login login) throws Exception
    {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(),login.getPassword())
            );
        }catch (Exception ex){
//            throw new Exception("Invalid UserName/Password");
            log.warn("Invalid Username/Password");
            return "Invalid Credentials";
        }
        User user = userRepository.findById(login.getUsername()).orElse(null);


        return jwtUtil.generateToken(login.getUsername()) + ' ' + user.getFirstName() + ' ' + user.getLastName() ;
    }
}
