package com.testingdemo.AirSecurityBackend.Controller;

import com.testingdemo.AirSecurityBackend.Model.SecurityStatus;
import com.testingdemo.AirSecurityBackend.Services.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:19006")
@RestController
public class SecurityController {
    @Autowired
    private SecurityService securityService;
    @PostMapping("/postSecurityStatus")
    public String PostSecurity(@RequestBody SecurityStatus securityStatus)
    {
        return securityService.postSecurityStatus(securityStatus);
    }
    @GetMapping("/getSecurityStatus/{id}")
    public String getSecurity(@PathVariable String id)
    {
        return securityService.getSecurityStatus(id);
    }
}