package com.testingdemo.AirSecurityBackend.Services;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
@Service
public class ValidateBcbpService {
    @Autowired
    private GenerateTicketRepository generateTicketRepository;
    public String ValidateBCBP(String data)
    {
        String[] arr=data.split(" ");
        int eTicket=Integer.parseInt(arr[0]);
        GenerateTicket generateTicket=generateTicketRepository.findById(eTicket).orElse(null);
        if(generateTicket!=null)
        {
            DateTimeFormatter todayTime = DateTimeFormatter.ofPattern("HH:mm:ss");
            DateTimeFormatter todayDate = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDateTime now = LocalDateTime.now();
            String date=todayDate.format(now);
            String time=todayTime.format(now);
            Time lt=Time.valueOf(time);
            if(generateTicket.getDate().equals(date) && lt.getTime()<generateTicket.getDepartureTime().getTime())
            {
                return "Valid BCBP";
            }
            return "Not valid for today";
        }
        return "Invalid BCBP";
    }
}