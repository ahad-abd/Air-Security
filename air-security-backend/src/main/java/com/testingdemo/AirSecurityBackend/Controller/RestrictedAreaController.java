package com.testingdemo.AirSecurityBackend.Controller;
import com.testingdemo.AirSecurityBackend.Services.RestrictedAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class RestrictedAreaController {
    @Autowired
    private RestrictedAreaService restrictedAreaService;

    @GetMapping(value="/restrictedArea/{info}")
    public String RestrictedArea(@PathVariable("info") String info)
    {
        return restrictedAreaService.restrictedArea(info);
    }
}

