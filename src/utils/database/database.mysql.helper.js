const mysql = require('mysql');
const { TYPES } = require('../../models/mysql/mysql.model');
const { log } = require('../logger/logger.helper');
const config = require("./../../configs/db/index").DB;

const connection = mysql.createConnection({
    
	host:config.MYSQL_HOST,
    port:config.MYSQL_PORT,
    database:config.MYSQL_NAME,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASS,
    typeCast: function castField( field, useDefaultTypeCasting ) {

		// We only want to cast bit fields that have a single-bit in them. If the field
		// has more than one bit, then we cannot assume it is supposed to be a Boolean.
		if ( ( field.type === "BIT" ) && ( field.length >= 1 ) ) {

			var bytes = field.buffer();

			// A Buffer in Node represents a collection of 8-bit unsigned integers.
			// Therefore, our single "bit field" comes back as the bits '0000 0001',
            // which is equivalent to the number 1.
            if(!bytes) return false;
			return( bytes[0] === 1 );

		}

		return( useDefaultTypeCasting() );

	}
});
/**
 * 
 * @param {("EXECUTE"|"SELECT")} type 
 * @param {string} q 
 * @param {any} data 
 * @param {boolean} isSp 
 * @returns 
 */
const mysqlQuery = function(type,q,data,isSp = true){
    return new Promise((resolve,reject)=>{
        connection.query(q,data,function(err,results,fields){
            if(err) {log(err); resolve({success:false,error:err});}
            else{
                if(type=="SELECT"){
                    if(isSp){
                        return resolve({success:true,data:results[0],fields:fields});
                    }
                }
                resolve({success:true,data:results,fields:fields});
            }
        })
    })
}
const mysqlExecute =async function(q,data,isSp=true){
    return await mysqlQuery("EXECUTE",q,data,isSp);
}
const mysqlSelect = async function(q,data=null,isSp=true){
    return await mysqlQuery("SELECT",q,data,isSp);
}

module.exports={mysqlExecute,mysqlSelect}
