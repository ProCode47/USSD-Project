const express = require("express");
const {
  MainMenu,
  Register,
  SendMoney,
  WithdrawMoney,
  CheckBalance,
  unregisteredMenu,
} = require("./menu");
const User = require("./models/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

//Configuring Express
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectionString = process.env.DB_URI;

//Configure MongoDB Database
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("MongoDB Running Successfully");
  })
  .catch((err) => {
    console.log({ err });
    console.log("MongoDB not Connected ");
  });

app.post("/", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  User.findOne({ number: phoneNumber })
    .then( async (user) => {
      // AUTHENTICATION PARAMETERS
      let userName;
      let userRegistered;
      let response = "";

      if (!user) {
        userRegistered = false;
      } else {
        userRegistered = true;
        userName = user.name;
      }

      // MAIN LOGIC
      if (text == "" && userRegistered == true) {
        response = MainMenu(userName);
      } else if (text == "" && userRegistered == false) {
        response = unregisteredMenu();
      } else if (text != "" && userRegistered == false) {
        const textArray = text.split("*");
        switch (textArray[0]) {
          case "1":
            response = await Register(textArray, phoneNumber);
            break;
          default:
            response = "END Invalid choice. Please try again";
        }
      } else {
        const textArray = text.split("*");
        switch (textArray[0]) {
          case "1":
            response = await SendMoney(textArray, phoneNumber);
            break;
          case "2":
            response = await WithdrawMoney(textArray);
            break;
          case "3":
            response = await CheckBalance(textArray);
            break;
          default:
            response = "END Invalid choice. Please try again";
        }
      }

      // Send the response back to the API
      res.set("Content-Type: text/plain");
      res.send(response);
    })
    .catch((err) => {
      console.log({ err });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}... `);
});
