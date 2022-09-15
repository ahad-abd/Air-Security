package com.testingdemo.AirSecurityBackend.Services;

import com.testingdemo.AirSecurityBackend.ClassObjects.TicketDetails;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.JpaRepository.SeatSelectionRepository;
import com.testingdemo.AirSecurityBackend.Model.BaggageStatus;
import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import com.testingdemo.AirSecurityBackend.Model.SeatSelection;
import com.testingdemo.AirSecurityBackend.Model.SecurityStatus;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Slf4j
@Service
public class GenerateTicketService {

    @Autowired
    private GenerateTicketRepository generateTicketRepository;

    @Autowired
    private SeatSelectionRepository seatSelectionRepository;


    public GenerateTicket TicketSaved(TicketDetails ticketDetails)
    {
        String uuid=UUID.randomUUID().toString();
        String pnr="";
        for(int i=0;i<uuid.length();i++)
        {
            if(uuid.charAt(i)!='-')
            {
                pnr+=uuid.charAt(i);
                if(pnr.length()==6)
                {
                    break;
                }
            }
        }


        Random rn = new Random();
        int range = 999999999- 111111111 + 1;
        int randomNum =  rn.nextInt(range) + 111111111;


        GenerateTicket gene=new GenerateTicket();
        gene.setPassengerName(ticketDetails.getPassengerName());
        gene.setFlightNumber(ticketDetails.getFlightNumber());
        gene.setAirLineName(ticketDetails.getAirLineName());
        gene.setDate(ticketDetails.getDate());
        gene.setDepartureLocation(ticketDetails.getDepartureLocation());
        gene.setArrivalLocation(ticketDetails.getArrivalLocation());
        gene.setArrivalTime(ticketDetails.getArrivalTime());
        gene.setDepartureTime(ticketDetails.getDepartureTime());
        gene.setClassType(ticketDetails.getClassType());
        gene.setPNR(pnr);
        gene.seteTicket(randomNum);
        gene.setDate2(ticketDetails.getDate2());



        if(seatSelectionRepository.findById(ticketDetails.getFlightNumber()).orElse(null)==null)
        {
            List<String> seat=new ArrayList<>();
            for(int i=0;i<10;i++)
            {
                seat.add('A'+Integer.toString(i));
            }
            SeatSelection seatSelection=new SeatSelection();
            seatSelection.setFlightNumber(ticketDetails.getFlightNumber());
            seatSelection.setSeats(seat);
            seatSelectionRepository.save(seatSelection);
        }
//        Logger logger = LoggerFactory.getLogger(GenerateTicketService.class);
//        logger.trace("logger info trace "+ticketDetails.getArrivalLocation());


        generateTicketRepository.save(gene);
        return gene;
    }
}
