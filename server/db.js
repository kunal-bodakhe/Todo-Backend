const Pool= require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"kunal@postgress",
    host:"localhost",
    database:"pernstack",
    port:5432
});

module.exports=pool;