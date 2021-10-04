const menu =  {
    
    MainMenu: () => {
        const response = `CON Welcome to Sure Finance... Nigeria's First Peer-to-Peer Banking App
            1. Create an Account
            2. Send Money
            3. Deposit Money
            4. Check Balance
            `;
        
        return response
    },
    Register: (textArray, phoneNumber) => {
        console.log("hit the register")
        let response = ""
        const level = textArray.length;
        console.log(level)

        if (level == 1) {
        let response = "CON Please enter your full name:"
        return response 
        } else if (level == 2) {
            let response = "CON Please choose a PIN:"
        return response 
       }else if(level == 3){
        let response = "CON Please confirm your PIN:"
        return response
       }else if(level == 4){
          const fullName =textArray[1];
          const  pin = textArray[2];
           const confirmPin =textArray[3];
            if(pin != confirmPin){
                return  response = "END Your pins do not match. Please try again";
            }else{
                //connect to DB and register a user. 
                return  response = "END You have been registered";
            }
       }

        
        
    },
    SendMoney:(textArray) => {
        response = "END Coming Soon...";
    },
    withdrawMoney:(textArray)=>{
        response = "END Coming Soon...";
    },
    CheckBalance:(textArray)=>{
        response = "END Coming Soon...";
    }

   

}



module.exports = menu