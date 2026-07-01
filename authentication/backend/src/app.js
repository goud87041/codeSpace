import express from 'express';
import cors from 'cors';

import userRoute from "./routes/user.route.js"
import bookRoute from "./routes/book.route.js"
import healthRoute from "./routes/health.route.js"

import {userRoute} from "./routes/user.route"
import {bookRoute} from "./routes/book.route"

import userRoute from "./routes/user.route.js"
import bookRoute from "./routes/book.route.js"

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend connection API!' });
});

app.use("/api/user", userRoute);
app.use("/api/Book" , bookRoute);
app.use("/api/health", healthRoute)
app.use("/api/health", healthRoute)






export default app;