package com.testingdemo.AirSecurityBackend.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class FlightStatus {

    @Id
    private String flightNumber;
    private String Status;
    private String date;

    @OneToOne(cascade = CascadeType.ALL)
    private SeatSelection seatSelection;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String  flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }
}
