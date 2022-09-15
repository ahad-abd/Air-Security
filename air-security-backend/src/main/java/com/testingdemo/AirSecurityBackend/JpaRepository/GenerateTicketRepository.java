package com.testingdemo.AirSecurityBackend.JpaRepository;

import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenerateTicketRepository extends JpaRepository<GenerateTicket,Integer>{
}
