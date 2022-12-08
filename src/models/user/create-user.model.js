const bcrypt = require("bcrypt");
class CreateUser{
    constructor(obj){
        this.firstName = obj?.firstName;
        this.lastName = obj?.lastName;
        this.email = obj?.email;
        this.number = obj?.number;
        this.avatar = obj?.avatar;
        this.userType = obj?.userType;
        this.password =this.encryptPassword(obj?.password);
    }
    isValid(){
        return this.firstName&&this.lastName&&this.email&&this.password;
    }
    encryptPassword(pass){
        return bcrypt.hashSync(pass,10);
    }
}
module.exports = {CreateUser};