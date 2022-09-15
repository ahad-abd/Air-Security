import { View, Text, PermissionsAndroid } from "react-native";
import React, { useState } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const isPermitted = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "External Storage Write Permission",
          message: "App needs access to Storage data",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      alert("Write permission err", err);
      return false;
    }
  } else {
    return true;
  }
};

let object = {};
let base64icon = "";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
       
        h1 {
            font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
           
        }
        p {
            font-family: Arial, sans-serif;
            font-size: 14px;
            text-align: default;
            color: #2f2d2d;
        }
        body{
            height : 70vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container{
            background-color: rgb(245, 245, 245);
            height : 500px;
            width: 1000px;
            border: 1px solid black;
            /* padding: 0 20px; */
        }
        .heading{
            background-color: rgb(199, 247, 231);
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .label_data{
            display: flex;
        }
        .fcd_row1{
            display: flex;
        }
        .fcd_row2{
            display: flex;
        }
        .details{
            margin:20px 25px;
        }
        h5{
            margin-left: 30px;
            text-decoration: underline;
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h4{
            font-family:v'Times New Roman', Times, sans-serif;
            text-transform:uppercase;
        }
        .mid_col{
            margin-left: 70px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="heading">
            <h1>Airplane Ticket</h1>
        </div>
        <div class="details">
            <div class="name_from_to">
                <div class="label_data">
                    <h4>Name Of The Passenger </h4>
                    <h5>${object.passengerName}</h5>
                </div>
                <div class="label_data">
                    <h4>FROM </h4>
                    <h5>${object.departureLocation}</h5>
                </div>
                <div class="label_data">
                    <h4>TO </h4>
                    <h5>${object.ArrivalLocation}</h5>
                </div>
                <div class="label_data">
                    <h4>AIRLINE </h4>
                    <h5>${object.airLineName}</h5>
                </div>
            </div>
            <div class="flight_class_datetime">
                <div class="fcd_row1">
                    <div class="label_data">
                        <h4>FLIGHT </h4>
                        <h5>${object.flightNumber}</h5>
                    </div>
                    
                    <div class="label_data mid_col">
                        <h4>CLASS </h4>
                        <h5>${object.classType}</h5>
                    </div>
                </div>
                <div class="fcd_row2">
                    <div class="label_data">
                        <h4>DATE </h4>
                        <h5>${object.date}</h5>
                    </div>
                    
                    <div class="label_data mid_col">
                        <h4>TIME </h4>
                        <h5>${object.departureTime}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
const bcbpHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
       
        h1 {
            font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
            color: '#2f2d2d';
            text-align: default;
        }
        p {
            font-family: Arial, sans-serif;
            font-size: 14px;
            text-align: default;
            color: #2f2d2d;
        }
        body{
            height : 70vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .inner_container{
            display: flex;
        }
        .container{
            background-color: rgb(245, 245, 245);
            height : 500px;
            width: 1000px;
            border: 1px solid black;
            /* padding: 0 20px; */
        }
        .heading{
            background-color: rgb(166, 251, 253);
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .label_data{
            display: flex;
        }
        .fcd_row1{
            display: flex;
        }
        .fcd_row2{
            display: flex;
        }
        .details{
            margin:20px 25px;
        }
        .label{
            font-family:'Times New Roman', Times, sans-serif;
            text-transform:uppercase;
            font-size: large;
            font-weight: bold;
        }
        .text_data{
            margin-left: 30px;
            text-decoration: underline;
            font-size: large;
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h5{
            
        }
        h4{
            
        }
        .mid_col{
            margin-left: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="heading">
            <h1>Boarding Pass</h1>
        </div>
        <div class="inner_container">
            <div class="details">
                <div class="name_from_to">
                    <div class="label_data">
                        <p class="label">Name Of The Passenger </p>
                        <p class="text_data">${object.passengerName}</p>
                    </div>
                    <div class="label_data">
                        <p class="label">FROM </p>
                        <p class="text_data">${object.departureLocation}</p>
                    </div>
                    <div class="label_data">
                        <p class="label">TO </p>
                        <p class="text_data">${object.ArrivalLocation}</p>
                    </div>
                    <div class="label_data">
                        <p class="label">AIRLINE </p>
                        <p class="text_data">${object.airLineName}</p>
                    </div>
                </div>
                <div class="flight_class_datetime">
                    <div class="fcd_row1">
                        <div class="label_data">
                            <p class="label">FLIGHT </p>
                            <p class="text_data">${object.flightNumber}</p>
                        </div>
                        <div class="label_data mid_col">
                            <p class="label">SEAT </p>
                            <p class="text_data">${object.seat}</p>
                        </div>
                        <div class="label_data mid_col">
                            <p class="label">CLASS </p>
                            <p class="text_data">${object.classType}</p>
                        </div>
                    </div>
                    <div class="fcd_row2">
                        <div class="label_data">
                            <p class="label">DATE </p>
                            <p class="text_data">${object.date}</p>
                        </div>
                        <div class="label_data mid_col">
                            <p class="label">GATE </p>
                            <p class="text_data">G5</p>
                        </div>
                        <div class="label_data mid_col">
                            <p class="label">TIME </p>
                            <p class="text_data">${object.departureTime}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bcbp">
                <img src=${base64icon} 
                    width="380" 
                    height="380"
                    alt="">
            </div>
        </div>
        
    </div>
</body>
</html>`;

export async function generatePdf(obj) {
  object = obj;

  const file = await printToFileAsync({
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
           
            h1 {
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
               
            }
            p {
                font-family: Arial, sans-serif;
                font-size: 14px;
                text-align: default;
                color: #2f2d2d;
            }
            body{
                height : 70vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .container{
                background-color: rgb(245, 245, 245);
                height : 500px;
                width: 1000px;
                border: 1px solid black;
                /* padding: 0 20px; */
            }
            .heading{
                background-color: rgb(199, 247, 231);
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .label_data{
                display: flex;
            }
            .fcd_row1{
                display: flex;
            }
            .fcd_row2{
                display: flex;
            }
            .details{
                margin:20px 25px;
            }
            h5{
                margin-left: 30px;
                text-decoration: underline;
                font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            h4{
                font-family:v'Times New Roman', Times, sans-serif;
                text-transform:uppercase;
            }
            .mid_col{
                margin-left: 70px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="heading">
                <h1>Airplane Ticket</h1>
            </div>
            <div class="details">
                <div class="name_from_to">
                    <div class="label_data">
                        <h4>Name Of The Passenger </h4>
                        <h5>${obj.passengerName}</h5>
                    </div>
                    <div class="label_data">
                        <h4>FROM </h4>
                        <h5>${obj.departureLocation}</h5>
                    </div>
                    <div class="label_data">
                        <h4>TO </h4>
                        <h5>${obj.arrivalLocation}</h5>
                    </div>
                    <div class="label_data">
                        <h4>AIRLINE </h4>
                        <h5>${obj.airLineName}</h5>
                    </div>
                </div>
                <div class="flight_class_datetime">
                    <div class="fcd_row1">
                        <div class="label_data">
                            <h4>FLIGHT </h4>
                            <h5>${obj.flightNumber}</h5>
                        </div>
                        <div class="label_data mid_col">
                            <h4>PNR </h4>
                            <h5>${obj.pnr}</h5>
                        </div>
                        <div class="label_data mid_col">
                            <h4>CLASS </h4>
                            <h5>${obj.classType}</h5>
                        </div>
                    </div>
                    <div class="fcd_row2">
                        <div class="label_data">
                            <h4>DATE </h4>
                            <h5>${obj.date}</h5>
                        </div>
                       
                        <div class="label_data mid_col">
                            <h4>TIME </h4>
                            <h5>${obj.departureTime}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `,
    base64: false,
  });

  await shareAsync(file.uri);
  console.log(file.uri);
}

export async function generateBCBPPdf(obj, base64) {
  object = obj;
  base64icon = base64;

  const file = await printToFileAsync({
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
           
            h1 {
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
                color: '#2f2d2d';
                text-align: default;
            }
            p {
                font-family: Arial, sans-serif;
                font-size: 14px;
                text-align: default;
                color: #2f2d2d;
            }
            body{
                height : 70vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .inner_container{
                display: flex;
            }
            .container{
                background-color: rgb(245, 245, 245);
                height : 500px;
                width: 1000px;
                border: 1px solid black;
                /* padding: 0 20px; */
            }
            .heading{
                background-color: rgb(166, 251, 253);
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .label_data{
                display: flex;
            }
            .fcd_row1{
                display: flex;
            }
            .fcd_row2{
                display: flex;
            }
            .details{
                margin:20px 25px;
            }
            .label{
                font-family:'Times New Roman', Times, sans-serif;
                text-transform:uppercase;
                font-size: large;
                font-weight: bold;
            }
            .text_data{
                margin-left: 30px;
                text-decoration: underline;
                font-size: large;
                font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            h5{
                
            }
            h4{
                
            }
            .mid_col{
                margin-left: 50px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="heading">
                <h1>Boarding Pass</h1>
            </div>
            <div class="inner_container">
                <div class="details">
                    <div class="name_from_to">
                        <div class="label_data">
                            <p class="label">Name Of The Passenger </p>
                            <p class="text_data">${obj.passengerName}</p>
                        </div>
                        <div class="label_data">
                            <p class="label">FROM </p>
                            <p class="text_data">${obj.departureLocation}</p>
                        </div>
                        <div class="label_data">
                            <p class="label">TO </p>
                            <p class="text_data">${obj.arrivalLocation}</p>
                        </div>
                        <div class="label_data">
                            <p class="label">AIRLINE </p>
                            <p class="text_data">${obj.airLineName}</p>
                        </div>
                    </div>
                    <div class="flight_class_datetime">
                        <div class="fcd_row1">
                            <div class="label_data">
                                <p class="label">FLIGHT </p>
                                <p class="text_data">${obj.flightNumber}</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">SEAT </p>
                                <p class="text_data">${obj.seat}</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">CLASS </p>
                                <p class="text_data">${obj.classType}</p>
                            </div>
                        </div>
                        <div class="fcd_row2">
                            <div class="label_data">
                                <p class="label">DATE </p>
                                <p class="text_data">${obj.date}</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">GATE </p>
                                <p class="text_data">G5</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">TIME </p>
                                <p class="text_data">${obj.time}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bcbp">
                    <img src=${base64} 
                        width="380" 
                        height="380"
                        alt="">
                </div>
            </div>
            
        </div>
    </body>
    </html>`,
    width:800,
    base64: false,
  });

  await shareAsync(file.uri);
  console.log(file.uri);
}
const DownloadTicket = () => {
  const [filePath, setFilePath] = useState("");

  return (
    <View>
      <Text>DownloadTicket</Text>
    </View>
  );
};
export default DownloadTicket;
