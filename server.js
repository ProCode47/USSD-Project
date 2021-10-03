const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//Configuring Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req.body);
  // Read the variables sent via POST from our API
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON Welcome to Sure Finance... Nigeria's First Peer-to-Peer Banking App
        1. Create an Account
        2. Send Money
        3. Deposit Money
        4. Withdraw Money
        `;
  }
  else if (text == "1") {
    response = `CON You're about to create an account with Sure Finance PLC. Please endeavour that all the details you give are reliable. Please state your full name
    `;  } 
   else if (text == "2") {
    response = `END This service is coming soon`;
  } else if (text == "3") {
    response = `END This service is coming soon`;
  } else if (text == "4") {
    response = `END This service is coming soon`;
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);
});
app.listen(PORT, () => {
  console.log("Server is running ...");
});
