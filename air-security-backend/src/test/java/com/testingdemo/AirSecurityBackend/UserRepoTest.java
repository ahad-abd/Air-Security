package com.testingdemo.AirSecurityBackend;
import com.testingdemo.AirSecurityBackend.Controller.UserController;
import com.testingdemo.AirSecurityBackend.JpaRepository.UserRepository;
import com.testingdemo.AirSecurityBackend.Model.Login;
import com.testingdemo.AirSecurityBackend.Model.User;
import com.testingdemo.AirSecurityBackend.Services.UserServices;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.junit.Assert;
import org.springframework.test.context.ActiveProfiles;
@Slf4j
@ActiveProfiles("test")
@SpringBootTest
public class UserRepoTest {

    @MockBean
    private UserRepository userRepository;
    @MockBean
    private UserServices userServices;
    @Test
    public void getSignupTest()
    {
        String userName="airsecurity@gmail.com";
        User user=new User("airsecurity@gmail.com","air","security","1234@abc","Admin");
        Mockito.when(userServices.Signup(user)).thenReturn(userName);
        Assert.assertTrue(userName.equals(userServices.Signup(user)));
    }

    @Test
    public void getLoginTest() throws Exception {
        String userName="airsecurity@gmail.com";
        Login login=new Login("airsecurity@gmail.com","1234@abc","Admin");
        Mockito.when(userServices.Login(login)).thenReturn("success");
        Assert.assertEquals("success",userServices.Login(login));
    }

}


