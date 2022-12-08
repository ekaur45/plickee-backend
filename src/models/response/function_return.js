function functionReturn(data,success=true){
    return {
        success,
        data
    }
}
module.exports = {functionReturn}