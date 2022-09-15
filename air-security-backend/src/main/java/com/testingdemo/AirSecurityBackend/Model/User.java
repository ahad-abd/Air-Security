package com.testingdemo.AirSecurityBackend.Model;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    private String emailId;
    private String firstName;
    private String lastName;
    private String passWord;
    private String role;



    public User() {
    }

    public User(String emailId, String firstName, String lastName, String passWord, String role) {
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passWord = passWord;
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
