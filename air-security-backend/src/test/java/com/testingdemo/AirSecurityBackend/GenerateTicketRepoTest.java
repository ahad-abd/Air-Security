package com.testingdemo.AirSecurityBackend;
import com.testingdemo.AirSecurityBackend.ClassObjects.TicketDetails;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.Model.GenerateTicket;
import com.testingdemo.AirSecurityBackend.Services.GenerateTicketService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import java.sql.Time;
@ActiveProfiles("test")
@SpringBootTest
@Slf4j
public class GenerateTicketRepoTest {

    @MockBean
    private GenerateTicketRepository generateTicketRepository;
    @MockBean
    private GenerateTicketService generateTicketService;
    @Test
    public void GenerateTicketTest(){
        Time t1=new Time(309494034);
        Time t2=new Time(309594034);
        GenerateTicket generateTicket=new GenerateTicket(3424443,"xyz","indigo","3AX45","mumbai",
                t1,t2,"Business","7-7-2022","7-7-2022","jd4j3d","delhi");
        TicketDetails ticketDetails=new TicketDetails("xyz","indigo","3AX45","mumbai",t1,t2,"Business",
                "07-07-2022","07-07-2022","delhi");
        Mockito.when(generateTicketService.TicketSaved(ticketDetails)).thenReturn(generateTicket);
        Assert.assertEquals(3424443,generateTicketService.TicketSaved(ticketDetails).geteTicket());
    }

}
