package com.testingdemo.AirSecurityBackend.Model;


public class GenerateBcbp {
    private String PNR;
//    private String username;

    public String getPNR() {
        return PNR;
    }

    public GenerateBcbp() {
    }

    public GenerateBcbp(String PNR) {
        this.PNR = PNR;
    }

    public void setPNR(String PNR) {
        this.PNR = PNR;
    }

//    public String getUsername() {
//        return username;
//    }

//    public void setUsername(String username) {
//        this.username = username;
//    }
}
