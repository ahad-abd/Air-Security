package com.testingdemo.AirSecurityBackend.Model;
import javax.persistence.*;
@Entity
public class BaggageStatus {
    @Id
    private String pnr;
    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "eticket")
    private GenerateTicket generateTicket;

    public BaggageStatus(String pnr, String status) {
        this.pnr = pnr;
        this.status = status;
    }

    public BaggageStatus() {
    }

    public String getPnr() {
        return pnr;
    }
    public void setPnr(String pnr) {
        this.pnr = pnr;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}