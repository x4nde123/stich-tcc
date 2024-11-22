
import mysql from 'mysql2/promise.js'

const con = await mysql.createConnection({
    uri: process.env.URI,
    
    typeCast: function (field, next ){
    
        if(field.type === 'TINY' && field.length === 1){
    return (field.string() === '1');
    
        }else if(field.type.includes('DECIMAL')){
    
            return Number(field.string());
        }
        else{
            return next();
        }
    
    }
    })


    console.log('Subiu DB');
    
    export default con;
