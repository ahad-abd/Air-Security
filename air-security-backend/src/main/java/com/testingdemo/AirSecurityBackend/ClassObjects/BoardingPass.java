package com.testingdemo.AirSecurityBackend.ClassObjects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Time;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardingPass {
    private String passengerName;
    private String departureLocation;
    private String arrivalLocation;
    private String date;
    private String classType;
    private Time time;
    private String flightNumber;
    private String seat;
    private String qrcode;
    private String airlineName;
}