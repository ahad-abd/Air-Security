package com.testingdemo.AirSecurityBackend.Model;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "SeatSelection")
public class SeatSelection {
    @Id
    private String flightNumber;
    @ElementCollection
    @Column(name = "seats")
    private List<String>seats=new ArrayList<>();


    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }
}
