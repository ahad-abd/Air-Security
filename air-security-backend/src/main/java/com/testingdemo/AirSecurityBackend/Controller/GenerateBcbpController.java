package com.testingdemo.AirSecurityBackend.Controller;

import com.testingdemo.AirSecurityBackend.ClassObjects.BoardingPass;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.Model.GenerateBcbp;
import com.testingdemo.AirSecurityBackend.Services.GenerateBcbpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins ={ "http://localhost:19006/","http://103.92.100.130"}, maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@RestController
public class GenerateBcbpController {

    @Autowired
    private GenerateTicketRepository generateTicketRepository;

    @Autowired
    private GenerateBcbpService generateQrCodeService;

    @PostMapping(value = "/GeneratingBarcode")
    public BoardingPass GenerateBoardingPass(@RequestBody GenerateBcbp generateBcbp){
        return generateQrCodeService.generateQrImage(generateBcbp);
    }
}
