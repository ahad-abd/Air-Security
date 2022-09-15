package com.testingdemo.AirSecurityBackend.JpaRepository;
import com.testingdemo.AirSecurityBackend.Model.SecurityStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface SecurityStatusRepository extends JpaRepository<SecurityStatus,String>{
}