package com.testingdemo.AirSecurityBackend.Controller;
import com.testingdemo.AirSecurityBackend.Model.BaggageStatus;
import com.testingdemo.AirSecurityBackend.Services.BaggageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:19006")
@RestController
public class BaggageController {
    @Autowired
    private BaggageService baggageService;
    @PostMapping(value = "/postBaggageStatus")
    public String SetBaggageStatus(@RequestBody BaggageStatus baggageStatus)
    {
        return baggageService.postBaggageStatus(baggageStatus);
    }

    @GetMapping(value="/getStatusOfBaggage/{id}")
    public String statusOfBaggage(@PathVariable String id)
    {
        return baggageService.getBaggageStatus(id);
    }
}