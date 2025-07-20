const Pool= require("pg").Pool;
let pool;
try {
    pool = new Pool({
        user:"postgres",
        password:"jCbzevzNAOqvKqeCliQJnOdmSKnJCMLI",
        host:"tramway.proxy.rlwy.net:26280",
        database:"railway",
        port:5432
    });
} catch (err) {
    console.log(err)
}

module.exports=pool;