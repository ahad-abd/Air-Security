package com.testingdemo.AirSecurityBackend.Services;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.testingdemo.AirSecurityBackend.ClassObjects.BoardingPass;
import com.testingdemo.AirSecurityBackend.JpaRepository.BaggageStatusRepository;
import com.testingdemo.AirSecurityBackend.JpaRepository.GenerateTicketRepository;
import com.testingdemo.AirSecurityBackend.JpaRepository.SeatSelectionRepository;
import com.testingdemo.AirSecurityBackend.JpaRepository.SecurityStatusRepository;
import com.testingdemo.AirSecurityBackend.Model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
@Service
@Slf4j
public class GenerateBcbpService {
    @Autowired
    private GenerateTicketRepository generateTicketRepository;

    @Autowired
    private SeatSelectionRepository seatSelectionRepository;

    @Autowired
    private SecurityStatusRepository securityStatusRepository;

    @Autowired
    private BaggageStatusRepository baggageStatusRepository;

    public BoardingPass generateQrImage(GenerateBcbp generateQrcode)
    {
        String PNR=generateQrcode.getPNR();
        List<GenerateTicket> l=generateTicketRepository.findAll();
        GenerateTicket generateTicket=null;
        int ticket=0;
        for(GenerateTicket i:l)
        {
            if(i.getPNR().equals(PNR))
            {
                ticket=i.geteTicket();
                generateTicket=i;
                break;
            }
        }
        if(ticket==0){return new BoardingPass();}

        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        Date date = new Date();
        String date_dep = generateTicket.getDate()+" "+generateTicket.getDepartureTime();
        try {
            Date depDate = dateFormat.parse(date_dep);
            long diff= date.getTime()-depDate.getTime();
            log.warn("Difference : "+Long.toString(diff));
            log.warn("current date : "+ date.getTime());
            log.warn("dep date  : "+depDate.getTime());
            if((diff<0 && diff<-10800000) || diff > 0)
            {
                return new BoardingPass();
            }

        }catch(Exception e)
        {
            e.printStackTrace();
            log.warn("error");
        }

        SecurityStatus securityStatus=new SecurityStatus();
        securityStatus.setPnr(generateTicket.getPNR());
        securityStatus.setStatus("Check-In");

        securityStatusRepository.save(securityStatus);

        BaggageStatus baggageStatus=new BaggageStatus();
        baggageStatus.setPnr(generateTicket.getPNR());
        baggageStatus.setStatus("Check-In");

        baggageStatusRepository.save(baggageStatus);

        String barCodeInfo= generateTicket.geteTicket() + " "+
                generateTicket.getPNR()+" "+
                generateTicket.getFlightNumber()+" "+
                generateTicket.getAirLineName()+" "+
                generateTicket.getPassengerName()+" "+
                generateTicket.getArrivalLocation()+" "+
                generateTicket.getDepartureLocation();
        return generateQrImage(barCodeInfo,10,20,generateTicket);
    }
    public BoardingPass generateQrImage(String text, int width, int height,GenerateTicket generateTicket) {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        byte[] pngData=new byte[10000];
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
            ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
            pngData = pngOutputStream.toByteArray();
        } catch (WriterException | IOException e) {
            log.trace("exception  Arises");
        }
        BoardingPass boardingPass=new BoardingPass();
        boardingPass.setPassengerName(generateTicket.getPassengerName());
        boardingPass.setDepartureLocation(generateTicket.getDepartureLocation());
        boardingPass.setArrivalLocation(generateTicket.getArrivalLocation());
        boardingPass.setDate(generateTicket.getDate());
        boardingPass.setClassType(generateTicket.getClassType());
        boardingPass.setTime(generateTicket.getDepartureTime());
        boardingPass.setFlightNumber(generateTicket.getFlightNumber());
        boardingPass.setSeat(seatNumber(generateTicket.getFlightNumber()));
        boardingPass.setQrcode(new String(Base64.getEncoder().encode(pngData)));
        boardingPass.setAirlineName(generateTicket.getAirLineName());
        return boardingPass;
    }

    public String seatNumber(String flightNumber)
    {
        SeatSelection seatSelection=seatSelectionRepository.findById(flightNumber).orElse(null);
        String seat="";
        if(seatSelection!=null)
        {
            List<String>l=seatSelection.getSeats();
            if(l.size()>0) {
                seat = l.get(0);
                l.remove(0);
            }
            seatSelection.setSeats(l);
            seatSelectionRepository.save(seatSelection);
        }
        return seat;
    }
}