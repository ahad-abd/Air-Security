package com.testingdemo.AirSecurityBackend.Services;
import com.testingdemo.AirSecurityBackend.JpaRepository.SecurityStatusRepository;
import com.testingdemo.AirSecurityBackend.Model.SecurityStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class SecurityService {

    @Autowired
    private SecurityStatusRepository securityStatusRepository;

    public String postSecurityStatus(SecurityStatus securityStatus){
        String pnr=securityStatus.getPnr();
        SecurityStatus securityStatus1=securityStatusRepository.findById(pnr).orElse(null);
        if(securityStatus1!=null)
        {
            securityStatusRepository.save(securityStatus);
            return "saved successfully";
        }
        return "Invalid pnr";
    }

    public String getSecurityStatus(String referenceNumber){
        SecurityStatus securityStatus=securityStatusRepository.findById(referenceNumber).orElse(null);
        if(securityStatus!=null){
            return securityStatus.getStatus();
        }
        return "Invalid pnr";
    }
}