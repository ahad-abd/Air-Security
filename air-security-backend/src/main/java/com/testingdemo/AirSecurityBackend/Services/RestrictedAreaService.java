package com.testingdemo.AirSecurityBackend.Services;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import org.mockito.internal.matchers.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class RestrictedAreaService {
    @Autowired
    private GenerateTicketRepository generateTicketRepository;
    public String restrictedArea(String info)
    {
        String[] arr=info.split(" ");
        int eTicket=Integer.parseInt(arr[0]);
        GenerateTicket generateTicket=generateTicketRepository.findById(eTicket).orElse(null);
        DateTimeFormatter todayTime = DateTimeFormatter.ofPattern("HH:mm:ss");
        DateTimeFormatter todayDate = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDateTime now = LocalDateTime.now();
        String date=todayDate.format(now);
        String time=todayTime.format(now);
        Time lt=Time.valueOf(time);
        if(generateTicket!=null)
        {
            if((generateTicket.getDepartureTime().getTime()-10800000)<lt.getTime() && lt.getTime()<generateTicket.getArrivalTime().getTime()+7200000)
            {
                return generateTicket.getClassType();
            }
        }
        return "invalid Type";
    }
}