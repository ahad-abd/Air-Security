package com.testingdemo.AirSecurityBackend.Controller;
import com.testingdemo.AirSecurityBackend.Services.ValidateBcbpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:19006")
@RestController
public class ValidateBcbpController {
    @Autowired
    private ValidateBcbpService validateBcbpService;
    @GetMapping(value="/validateBCBP/{id}")
    public String ValidatingBCBP(@PathVariable("id") String data)
    {
        return validateBcbpService.ValidateBCBP(data);
    }
}