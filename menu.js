const User = require("./models/user");
const bcrypt = require("bcrypt");
const menu = {
  MainMenu: (userName) => {
    const response = `CON Welcome ${userName}, which action you wish to perform ?
            1. Send Money
            2. Deposit Money
            3. Check Balance
            `;

    return response;
  },
  unregisteredMenu: () => {
    const response = `CON Welcome to Aza Mobile Finance. The First Peer-to-Peer Banking Service in Nigeria.
            1. Register
            `;

    return response;
  },
  Register: async (textArray, phoneNumber) => {
    const level = textArray.length;
    if (level == 1) {
      let response =
        "CON You're about to create an account with Aza Mobile Finance PLC. Please endeavour that all the details you give are reliable. Please enter your surname:";
      return response;
    } else if (level == 2) {
      let response = `CON This phone number will be used as your account number for transfers, withdrawals and deposits
        1. Agree and Continue `;
      return response;
    } else if (level == 3) {
      let response = "CON Please choose a 5-digit PIN to secure your account:";
      return response;
    } else if (level == 4) {
      let response = "CON Please confirm your PIN:";
      return response;
    } else if (level == 5) {
      const pin = textArray[3];
      const confirmPin = textArray[4];
      if (/[^a-zA-Z]/.test(textArray[1])) {
        return (response =
          "END Your full name must not consist of any number or symbol. Please try again");
      } else if (pin.toString().length != 5 && isNaN(pin)) {
        return (response =
          "END Your pin does not follow our guidelines. Please try again");
      } else if (pin != confirmPin) {
        return (response = "END Your pins do not match. Please try again");
      } else {
        let response = "";
        async function createUser() {
          const userData = {
            name: textArray[1],
            number: phoneNumber,
            pin: textArray[3],
          };
          bcrypt.hash(userData.pin, 10, (err, hash) => {
            userData.pin = hash;
          });
          let user = await User.create(userData);
          return user;


        }

        let user = await createUser();

        if (!user) {
          response =
            "END An unexpected error occurred... Please try again later";
        } else {
          let userName = user.name;
          response = `END Congratulations ${userName}, You've been successfully registered with Aza Mobile`;
        }

        return response;
      }
    }
  },
  SendMoney: async (textArray, phoneNumber) => {
    const level = textArray.length;
    if (level == 1) {
      return (response = "CON Enter mobile number of the receiver:");
    } else if (level == 2) {
      return (response = "CON Enter amount:");
    } else if (level == 3) {
      return (response = "CON Enter your PIN:");
    } else if (level == 4) {
      let response = "";
      async function confirmDetails() {
        let user = await User.findOne({ number: textArray[1] }); // wait until the promise resolves (*)
        console.log(user);
        return user;
      }

      let user = await confirmDetails();
      if (!user) {
        response =
          "END This receipient does not have an account with Aza Mobile, hence transfers to this number are not eligbile";
      } else {
        let userName = user.name;
        response = `CON You're about to send NGN ${textArray[2]} to ${userName}
      1. Confirm
      2. Cancel `;
      }

      return response;
    } else if (level == 5 && textArray[4] == 1) {
      //check if PIN is correct
      //send the money
      //If the account has enough funds including charges etc..
      pin = textArray[3];
      amount = textArray[2];
      //connect to DB
      //Complete transaction
      return (response =
        "END We are processing your request. You will receive an SMS shortly");
    } else if (level == 5 && textArray[4] == 2) {
      //Cancel Transaction
      return (response = "END Canceled. Thank you for using our service");
    } else {
      return (response = "END Invalid entry");
    }
  },
  WithdrawMoney: async (textArray) => {
    let response = "END This service will be available soon...";
    return response;
  },
  CheckBalance: async (textArray) => {
    let response = "END This service will be available soon...";
    return response;
  },
};

module.exports = menu;
