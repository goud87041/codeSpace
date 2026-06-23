import dotenv from "dotenv" ;
import mongooseInstence  from "../src/config/db.js"
import app from "./server.js"



dotenv.config()

const port = process.env.PORT ;


mongooseInstence()
        .then(()=>{
            app.listen(port , ()=>{
                console.log(`server running at the ${port}`);
                
            })
        })
        .catch((error) => {
    console.log(`Something went wrong on port ${port}`);
    console.error(error);
});

