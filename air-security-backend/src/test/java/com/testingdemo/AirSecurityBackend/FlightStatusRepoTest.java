package com.testingdemo.AirSecurityBackend;
import com.testingdemo.AirSecurityBackend.ClassObjects.FlightInfo;
import com.testingdemo.AirSecurityBackend.Services.FlightStatusService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
@SpringBootTest
@Slf4j
@ActiveProfiles("test")
public class FlightStatusRepoTest {

    @MockBean
    private FlightStatusService flightStatusService;
    @Test
    public void FLightStatusTest()
    {
        FlightInfo flightInfo=new FlightInfo("1Adfb2","1AX34","07-07-2022");
        Mockito.when(flightStatusService.GetFlightStatus(flightInfo)).thenReturn("success");
        Assert.assertEquals("success",flightStatusService.GetFlightStatus(flightInfo));
    }

}


