const express = require("express");
const { MainMenu, Register, SendMoney, WithdrawMoney, CheckBalance, unregisteredMenu } = require('./menu');
const User = require("./models/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
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
    console.log({err})
    console.log("MongoDB not Connected ");
  });


app.post("/", (req, res) => {
  let userName = "";
  let response = '';
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  const userRegistered = User.findOne({number: phoneNumber})
    .then((user) => {
      if (!user) {
        return false;
      } else {
        userName = user.name;
        return true;
    }
    })
    .catch((err) => {
    console.log({err})
  })

  console.log(userRegistered)

  if (text == "" && userRegistered == true) {
   response = MainMenu(userName)
  }
  else if ( text == "" && userRegistered == false ) {
    response = unregisteredMenu()
  }
  else if ( text != "" && userRegistered == false ) {
    const textArray = text.split("*");
    switch(textArray[0]){
        case "1": 
            response = Register(textArray, phoneNumber);
        break;
        default:
            response = "END Invalid choice. Please try again";
    }
  }
  else {
    const textArray = text.split("*");
    switch (textArray[0]) {
      case "2":
         response = SendMoney(textArray, sessionId);
          break;
        case "3":
         response = WithdrawMoney(textArray);
          break;
        case "4":
         response = CheckBalance(textArray);
          break;
      default:
        response = "END Invalid choice. Please try again";
    }
  }


  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);

});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}... `);
});
