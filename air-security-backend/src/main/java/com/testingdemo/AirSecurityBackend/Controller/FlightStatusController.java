package com.testingdemo.AirSecurityBackend.Controller;

import com.testingdemo.AirSecurityBackend.ClassObjects.FlightInfo;
import com.testingdemo.AirSecurityBackend.Services.FlightStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins ={ "http://localhost:19006/"})
@RestController
public class FlightStatusController {

    @Autowired
    private FlightStatusService flightStatusService;

    @PostMapping(value="/GetFlightStatus")
    public String GetFlightStatus(@RequestBody FlightInfo flightInfo)
    {
        return flightStatusService.GetFlightStatus(flightInfo);
    }
}
