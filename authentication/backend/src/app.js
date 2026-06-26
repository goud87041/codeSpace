import express from 'express';
import cors from 'cors';
import {userRoute} from "./routes/user.route"
import {bookRoute} from "./routes/book.route"


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend connection API!' });
});

app.use("/api/user", userRoute);
app.use("/api/Book" , bookRoute);






export default app;