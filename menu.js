const User = require("./models/user");
const countryCode = require("./util/countryCode");
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
      // Check if the name is strictly alphabets via regex
      if (/[^a-zA-Z]/.test(textArray[1])) {
        return (response =
          "END Your full name must not consist of any number or symbol. Please try again");
      } // Check if the pin is 5 characters long and is purely numerical
      else if (pin.toString().length != 5 && isNaN(pin)) {
        return (response =
          "END Your pin does not follow our guidelines. Please try again");
      } // Check if the pin and confirmed pin is the same
      else if (pin != confirmPin) {
        return (response = "END Your pins do not match. Please try again");
      } else {
        // proceed to register user
        let response = "";
        async function createUser() {
          const userData = {
            name: textArray[1],
            number: phoneNumber,
            pin: textArray[3],
          };
          // hashes the user pin and updates the userData object
          bcrypt.hash(userData.pin, 10, (err, hash) => {
            userData.pin = hash;
          });

          // create user and register to DB
          let user = await User.create(userData);
          return user;
        }

        // Assigns the created user to a variable for manipulation
        let user = await createUser();
        // If user creation failed
        if (!user) {
          response =
            "END An unexpected error occurred... Please try again later";
        }
        // if user creation was successful
        else {
          let userName = user.name;
          response = `END Congratulations ${userName}, You've been successfully registered with Aza Mobile
          Dial *384*33622# to start using our services`;
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

      // Checks DB for the receivers details and returns the value
      async function confirmDetails() {
        const userNumber = countryCode(textArray[1]);
        let user = await User.findOne({ number: userNumber });
        return user;
      }

      // Assigns the user to a variable for manipulation
      let user = await confirmDetails();
      // If user was not found in the DB
      if (!user) {
        response =
          "END This receipient does not have an account with Aza Mobile, hence transfers to this number are not eligbile";
      }
      // if user was found and details were retrieved
      else {
        let userName = user.name;
        response = `CON You're about to send NGN ${textArray[2]} to ${userName}
      1. Confirm
      2. Cancel `;
      }

      return response;
    } else if (level == 5 && textArray[4] == 1) {
      // TODO check if PIN is correct
      // TODO send the money
      // TODO If the account has enough funds including charges etc..
      // TODO connect to DB
      // TODO Complete transaction
      pin = textArray[3];
      amount = textArray[2];

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
