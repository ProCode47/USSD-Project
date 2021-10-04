const menu = {
  MainMenu: () => {
    const response = `CON Welcome to Sure Finance... Nigeria's First Peer-to-Peer Banking App
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
      let response = "CON You're about to create an account with Sure Finance PLC. Please endeavour that all the details you give are reliable. Please state your full name:";
      return response;
    } else if (level == 2) {
        let response = `CON This phone number will be used as your account number for transfers, withdrawals and deposits too
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
      const pin = textArray[2];
      const confirmPin = textArray[3];
      if (pin != confirmPin) {
        return (response = "END Your pins do not match. Please try again");
      } else {
        //connect to DB and register a user.
        return (response = "END You have been registered");
      }
    }
  },
    SendMoney: (textArray) => {
    let response = "END Coming Soon...";
    return response 
  },
  withdrawMoney: (textArray) => {
    let response = "END Coming Soon...";
    return response   },
  CheckBalance: (textArray) => {
    let response = "END Coming Soon...";
    return response   },
};

module.exports = menu;
