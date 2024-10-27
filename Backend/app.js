import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { errormiddleware } from "./middleware/errormiddleware.js";
import user_router from "./router/userRouter.js";
import { User } from "./models/user_scheema.js";
import twilio from "twilio";
import axios from "axios"; 
import appointment_router from "./router/appointmentRouter.js";
import http from 'http'; 
import { Server } from 'socket.io';

const app = express();

config({ path: "./config/config.env" });

const port = process.env.PORT || 5000;
const uri = process.env.DATABASE_URI;

// Middleware setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// App routes
app.use("/api/v1/user", user_router);
app.use("/api/v1/appointment", appointment_router);

app.get("/verify", async (req, res) => {
  const updateInfo = await User.updateOne(
    { _id: req.query.id },
    { $set: { isVerified: 1 } }
  );

  console.log(updateInfo);
  res.redirect(`${process.env.FRONTEND_URL}`);
});

// Database connection
try {
  mongoose.connect(uri);
  console.log("Database connected");
} catch (error) {
  console.log(`Error: ${error.message}`);
}

// Using Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Twilio credentials
const accountSid = process.env.accountSid; 
const authToken = process.env.authToken;  
const client = new twilio(accountSid, authToken);

// Function to check weather and send alerts
function checkWeatherAndSendAlert() {
  const weatherApiKey =e18f32a2e8451cc302f17aed24f5c00d 
  const city = 'Delhi'; 

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`)
    .then(response => {
      const weatherData = response.data;
      const weatherCondition = weatherData.weather[0].main;
      const temperature = weatherData.main.temp - 273.15; // Kelvin to Celsius
      const windSpeed = weatherData.wind.speed; // m/s
      const humidity = weatherData.main.humidity; // %
      const pressure = weatherData.main.pressure; // hPa
      let alertMsg = '';

      // Determine alert messages based on weather conditions
      if (weatherCondition === 'Rain') {
        alertMsg = '🌧️ Rain Alert: Heavy rains expected. Take precautions for crops.';
      } else if (weatherCondition === 'Snow') {
        alertMsg = '❄️ Snow Alert: Snowfall expected. Protect your crops.';
      } else if (windSpeed > 30) {
        alertMsg = `🌬️ Strong Winds Alert: High winds (${windSpeed} km/h) detected. Secure crops.`;
      } else if (temperature > 40) {
        alertMsg = `☀️ Heatwave Alert: High temperatures of ${temperature}°C. Ensure crops are hydrated.`;
      } else if (temperature < 0) {
        alertMsg = `❄️ Frost Alert: Low temperatures detected (${temperature}°C). Protect crops from frost.`;
      } else if (humidity < 20) {
        alertMsg = `💧 Dry Air Alert: Humidity too low (${humidity}%). Adjust irrigation.`;
      } else if (humidity > 90) {
        alertMsg = `💧 Humidity Alert: High humidity (${humidity}%). Watch for mold or disease.`;
      } else if (pressure < 1000) {
        alertMsg = `🌩️ Storm Alert: Low air pressure detected. Be prepared for storms.`;
      }

      
      if (alertMsg) {
        client.messages.create({
          body: alertMsg,
          from: process.env.TWILIO_PHONE_NUMBER, 
          to: '+916394658895', // Recipient's number
        })
        .then((message) => console.log('Weather alert sent! Message SID:', message.sid))
        .catch((error) => console.error('Error sending message:', error));
      } else {
        console.log('No extreme weather conditions detected.');
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Check the weather and send alerts every 6 hours
setInterval(checkWeatherAndSendAlert, 6 * 60 * 60 * 1000); 

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('sendMessage', (message) => {
    socket.broadcast.emit('receiveMessage', message);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Backend running at port ${port}`);
});

// Middleware for error handling
app.use(errormiddleware);
