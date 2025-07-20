const Pool= require("pg").Pool;
let pool;
try {
    pool = new Pool({
        user:"postgres",
        password:"jCbzevzNAOqvKqeCliQJnOdmSKnJCMLI",
        host:"postgres.railway.internal",
        database:"railway",
        port:5432
    });
} catch (err) {
    console.log({ msg: "database error", err})
}

module.exports=pool;