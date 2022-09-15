package com.testingdemo.AirSecurityBackend.Model;
import javax.persistence.*;
@Entity
public class SecurityStatus {
    @Id
    private String pnr;
    private String status;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "eticket")
//    private GenerateTicket generateTicket;


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