package com.testingdemo.AirSecurityBackend.ClassObjects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightInfo {
    private String pnr;
    private String flightNumber;
    private String date;
}
