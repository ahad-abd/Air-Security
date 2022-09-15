package com.testingdemo.AirSecurityBackend.JpaRepository;
import com.testingdemo.AirSecurityBackend.Model.BaggageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BaggageStatusRepository extends JpaRepository<BaggageStatus,String> {
}