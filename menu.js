const menu = {
  MainMenu: () => {
    const response = `CON Welcome to Aza Mobile Finance.
    Nigeria's First Peer-to-Peer Banking Service.
            1. Create an Account
            2. Send Money
            3. Deposit Money
            4. Check Balance
            `;

    return response;
  },
  Register: (textArray, phoneNumber) => {
    const level = textArray.length;
    if (level == 1) {
      let response = "CON You're about to create an account with Aza Mobile Finance PLC. Please endeavour that all the details you give are reliable. Please state your full name:";
      return response;
    } else if (level == 2) {
        let response = `CON This phone number will be used as your account number for transfers, withdrawals and deposits
        1. Agree and Continue `;
        return response;
    } else if (level == 3) {
      let response = "CON Please choose a PIN:";
      return response;
    } else if (level == 4) {
      let response = "CON Please confirm your PIN:";
      return response;
    } else if (level == 5) {
      const fullName = textArray[1];
      const pin = textArray[3];
      const confirmPin = textArray[4];
      if (pin != confirmPin) {
        return (response = "END Your pins do not match. Please try again");
      } else {
        //connect to DB and register a user.
        return (response = "END You have been registered");
      }
    }
  },
    SendMoney: (textArray) => {
      const level = textArray.length;
  let receiverMobile = "null";
  let response = "";
  if(level == 1){
      return (response =  "CON Enter mobile number of the receiver:")
  }else if(level == 2){
      return (response =  "CON Enter amount:")
  }else if(level == 3){
      return (response =  "CON Enter your PIN:")
  } else if (level == 4) {
    //TODO get the name of the receiver via DB
    receiverMobile = textArray[1];
      return (response =  `CON You're about to send ${textArray[2]} to ${receiverMobile} 
      "1. Confirm
      "2. Cancel `)
  }else if(level == 5 && textArray[4] == 1){
      //check if PIN is correct
      //send the money
      //If the account has enough funds including charges etc..
      pin = textArray[3];
      amount = textArray[2];
      //connect to DB
      //Complete transaction
      return (response =  "END We are processing your request. You will receive an SMS shortly")

  }else if(level == 5 && textArray[4] == 2){
      //Cancel Transaction
      return (response =  "END Canceled. Thank you for using our service")
  }else {
      return (response =  "END Invalid entry")
  }   
  },
  WithdrawMoney: (textArray) => {
    let response = "END This service will be available soon...";
    return response   },
  CheckBalance: (textArray) => {
    let response = "END This service will be available soon...";
    return response   },
};

module.exports = menu;
