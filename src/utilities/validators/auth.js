exports.isValidMobileNumber = (value) =>{
        if(value.length != 10){ 
            return false;
        }
        if(!value.isNAN()){
            return false;
        }
        return true;
}