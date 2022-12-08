class CreateAccountModel{
    constructor(obj){
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.password = obj.password;
        this.validateCreateRequest = function(){
            return (!this.email || !this.password);
        }
    }

}
module.exports = {CreateAccountModel}