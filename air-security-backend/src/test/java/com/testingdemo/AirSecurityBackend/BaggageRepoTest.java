package com.testingdemo.AirSecurityBackend;

import com.testingdemo.AirSecurityBackend.Model.BaggageStatus;
import com.testingdemo.AirSecurityBackend.Services.BaggageService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
@SpringBootTest
@ActiveProfiles("test")
@Slf4j
public class BaggageRepoTest {
    @MockBean
    private BaggageService baggageService;

    @Test
    public void getBaggageStatusTest()
    {
        BaggageStatus baggageStatus=new BaggageStatus("12AD#E","Reached");
        Mockito.when(baggageService.getBaggageStatus("12AD#E")).thenReturn(baggageStatus.getStatus());
        Assert.assertEquals("Reached",baggageService.getBaggageStatus("12AD#E"));
    }
    @Test
    public void setBaggageStatusTest()
    {
        BaggageStatus baggageStatus=new BaggageStatus("12we3@","flying");
        Mockito.when(baggageService.postBaggageStatus(baggageStatus)).thenReturn("saved");
        Assert.assertEquals("saved",baggageService.postBaggageStatus(baggageStatus));
    }
}