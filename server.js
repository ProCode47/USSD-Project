const express = require("express");
const {MainMenu, Register, SendMoney, WithdrawMoney, CheckBalance} = require('./menu');
const app = express();
const PORT = process.env.PORT || 5000;

//Configuring Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  const userRegistered = false;
  let response = '';

  if (text == "" && userRegistered == false) {
  console.log("Hitting 1")
   response = MainMenu()
  }
  else if (userRegistered == false && text != "") {
    console.log("Hitting 2")
    const textArray = text.split("*");
    console.log(text)
    console.log(textArray)
    switch (textArray[0]) {
      case 1:
        Register(textArray, phoneNumber);
        break;
      default:
        response = "END Invalid choice. Please try again";
    }
  }
  else {
    console.log("Hitting 3")

    const textArray =  text.split("*");
    switch (textArray[0]) {
      case 1:
        SendMoney(textArray, sessionId);
        break;
      case 2:
        WithdrawMoney(textArray);
        break;
      case 3:
        CheckBalance(textArray);
        break;
      default:
        response = "END Invalid\n";
    }
 
  }
  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);

});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}... `);
});
