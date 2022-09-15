package com.testingdemo.AirSecurityBackend.Controller;

import com.testingdemo.AirSecurityBackend.ClassObjects.TicketDetails;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import com.testingdemo.AirSecurityBackend.Services.GenerateTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins ={ "http://localhost:19006/","http://103.92.100.130"}, maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@RestController
public class GenerateTickerController {

    @Autowired
    private GenerateTicketService generateTicketService;



    @PostMapping(value="/GenerateTicketSave")
    public GenerateTicket GeneratingTicketSaved(@RequestBody TicketDetails ticketDetails)
    {
        return generateTicketService.TicketSaved(ticketDetails);
    }
}
