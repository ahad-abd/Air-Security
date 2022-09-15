package com.testingdemo.AirSecurityBackend.Services;
import com.testingdemo.AirSecurityBackend.ClassObjects.FlightInfo;
import com.testingdemo.AirSecurityBackend.JpaRepository.FlightStatusRepository;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;
@Service
public class FlightStatusService {

    @Autowired
    private GenerateTicketRepository generateTicketRepository;
    @Autowired
    private FlightStatusRepository flightStatusRepository;

    public String GetFlightStatus(FlightInfo flightInfo) {
        String FlightNumber = flightInfo.getFlightNumber();
        String PNR = flightInfo.getPnr();
        List<GenerateTicket> l = generateTicketRepository.findAll();

        for (GenerateTicket i : l) {
            if (i.getFlightNumber().equals(FlightNumber) && i.getDate().equals(flightInfo.getDate())) {
                DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
                Date date = new Date();
                String localTime = dateFormat.format(date).toString();
                String date_dep = i.getDate()+" "+i.getDepartureTime();
                String date_arr = i.getDate2()+" "+i.getArrivalTime();
                try {
                    Date depDate = dateFormat.parse(date_dep);
                    Date arrDate = dateFormat.parse(date_arr);
                    long diff1=date.getTime()-arrDate.getTime();
                    long diff2=date.getTime()-depDate.getTime();
                    if(diff1<0 && diff2<0)
                    {
                        return "The Flight is on time. \nThe Flight will take off in "+Convert(-diff2);
                    }
                    else if(diff1>0 && diff2>0)
                    {
                        return "Flight has reached the Destinaion";
                    }
                    else
                    {
                        return "flight will be landed with in "+Convert(-diff1);
                    }
                } catch (Exception e) {
                    StringWriter errors = new StringWriter();
                    e.printStackTrace(new PrintWriter(errors));
                    return errors.toString();
                }
            }

        }
        return "No particular flights on this Date";
    }

    public String Convert(long milliseconds) {
        final long day = TimeUnit.MILLISECONDS.toDays(milliseconds);
        final long hours = TimeUnit.MILLISECONDS.toHours(milliseconds)
                - TimeUnit.DAYS.toHours(TimeUnit.MILLISECONDS.toDays(milliseconds));
        final long minutes = TimeUnit.MILLISECONDS.toMinutes(milliseconds)
                - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(milliseconds));
        final long seconds = TimeUnit.MILLISECONDS.toSeconds(milliseconds)
                - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(milliseconds));
        final long ms = TimeUnit.MILLISECONDS.toMillis(milliseconds)
                - TimeUnit.SECONDS.toMillis(TimeUnit.MILLISECONDS.toSeconds(milliseconds));
        String result = String.format("%d Hours %d Minutes", hours, minutes);
        return result;
    }
}