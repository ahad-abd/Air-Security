package com.testingdemo.AirSecurityBackend;
import com.testingdemo.AirSecurityBackend.ClassObjects.BoardingPass;
import com.testingdemo.AirSecurityBackend.Model.GenerateBcbp;
import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import com.testingdemo.AirSecurityBackend.Services.GenerateBcbpService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import java.sql.Time;
@SpringBootTest
@ActiveProfiles("test")
@Slf4j
public class GenerateBcbpRepoTest {

    @MockBean
    private GenerateBcbpService generateBcbpService;
    @Test
    public void GenerateBcbpTest() throws Exception
    {
        Time t=new Time(934934);
        GenerateBcbp generateBcbp=new GenerateBcbp("kf234q");
        Mockito.when(generateBcbpService.generateQrImage(generateBcbp)).thenReturn(new BoardingPass("sugunath",
                "mumbai","delhi","07-07-2022","business",t,"1AX34","A1",
                "fjsfklfnskfmn23kl2rk2m#JN$", "SpiceJet"));
        Assert.assertEquals("1AX34",generateBcbpService.generateQrImage(generateBcbp).getFlightNumber());
    }

}
