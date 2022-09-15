package com.testingdemo.AirSecurityBackend.JpaRepository;
import com.testingdemo.AirSecurityBackend.Model.SeatSelection;
import org.springframework.data.jpa.repository.JpaRepository;
public interface SeatSelectionRepository extends JpaRepository<SeatSelection,String> {
}
