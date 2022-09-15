package com.testingdemo.AirSecurityBackend.ClassObjects;

import java.sql.Time;

public class TicketDetails {

    private String passengerName;
    private String airLineName;
    private String flightNumber;
    private String departureLocation;
    private Time departureTime;
    private Time arrivalTime;
    private String classType;
    private String date;
    private String date2;
    private String arrivalLocation;

    public TicketDetails(String passengerName, String airLineName, String flightNumber, String departureLocation, Time departureTime, Time arrivalTime, String classType, String date, String date2, String arrivalLocation) {
        this.passengerName = passengerName;
        this.airLineName = airLineName;
        this.flightNumber = flightNumber;
        this.departureLocation = departureLocation;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.classType = classType;
        this.date = date;
        this.date2 = date2;
        this.arrivalLocation = arrivalLocation;
    }

    public Time getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Time departureTime) {
        this.departureTime = departureTime;
    }

    public Time getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Time arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getAirLineName() {
        return airLineName;
    }

    public void setAirLineName(String airLineName) {
        this.airLineName = airLineName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date= date;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getDepartureLocation() {
        return departureLocation;
    }

    public void setDepartureLocation(String departureLocation) {
        this.departureLocation = departureLocation;
    }

    public String getArrivalLocation() {
        return arrivalLocation;
    }

    public void setArrivalLocation(String arrivalLocation) {
        this.arrivalLocation = arrivalLocation;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }

    public String getDate2() {
        return date2;
    }

    public void setDate2(String date2) {
        this.date2 = date2;
    }
}
