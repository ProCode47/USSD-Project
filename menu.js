const menu =  {
    
    MainMenu: (userText) => {
        response = `CON Welcome to Sure Finance... Nigeria's First Peer-to-Peer Banking App
            1. Create an Account
            2. Send Money
            3. Deposit Money
            4. Check Balance
            `;
            res.send(response);
    },
    Register: (textArray, phoneNumber) => {
        const level = text.length;
        if(level == 1){
            response = "CON Please enter your full name:";
       } else if(level == 2){
            response = "CON Please choose a PIN:";
       }else if(level == 3){
            response = "CON Please re-enter your PIN:";
       }else if(level == 4){
          const fullName =textArray[1];
          const  pin = textArray[2];
           const confirmPin =textArray[3];
            if(pin != confirmPin){
                response = "END Your pins do not match. Please try again";
            }else{
                //connect to DB and register a user. 
                response = "END You have been registered";
            }
       }

        
        
    }
}



module.exports = menu