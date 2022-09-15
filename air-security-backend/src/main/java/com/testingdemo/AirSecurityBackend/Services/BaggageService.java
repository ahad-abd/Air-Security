package com.testingdemo.AirSecurityBackend.Services;
import com.testingdemo.AirSecurityBackend.JpaRepository.BaggageStatusRepository;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.Model.BaggageStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class BaggageService {
    @Autowired
    private BaggageStatusRepository baggageStatusRepository;
    @Autowired
    private GenerateTicketRepository generateTicketRepository;

    public String postBaggageStatus(BaggageStatus baggageStatus)
    {
        String pnr= baggageStatus.getPnr();
        BaggageStatus baggageStatus1 = baggageStatusRepository.findById(pnr).orElse(null);
        if(baggageStatus1 !=null) {
            baggageStatusRepository.save(baggageStatus);
            return "saved successfully";
        }
        return "Invalid pnr";
    }

    public String getBaggageStatus(String referenceNumber) {
        BaggageStatus baggageStatus = baggageStatusRepository.findById(referenceNumber).orElse(null);
        if(baggageStatus == null)
        {
            return "Invalid pnr";
        }
        return baggageStatus.getStatus();
    }
}