const { response } = require("express");
const express = require("express");
const menu = require('./menu');
const app = express();
const PORT = process.env.PORT || 5000;

//Configuring Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, userText } = req.body;
  const userRegistered = false;

  if (userText == "" && userRegistered == false) {
    console.log("hit me")
    menu.MainMenu
  }
  else if (userRegistered == false && userText != "") {
    console.log("hit me2")

    const textArray =  userText.split("*");
    switch (textArray[0]) {
      case 1:
        menu.Register(textArray, phoneNumber);
        break;
      default:
        response = "END Invalid choice. Please try again";
    }
  }
  else {
    console.log("hit me3")

    const textArray =  userText.split("*");
    switch (textArray[0]) {
      case 1:
        menu.SendMoney(textArray, sessionId);
        break;
      case 2:
        menu.WithdrawMoney(textArray);
        break;
      case 3:
        menu.CheckBalance(textArray);
        break;
      default:
        response = "END Invalid menu\n";
    }
 

    // Send the response back to the API
    res.set("Content-Type: text/plain");
    res.send(response);
  }
});
app.listen(PORT, () => {
  console.log("Server is running ...");
});
