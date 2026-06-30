import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
<<<<<<< HEAD
import userRoute from "./routes/user.route.js"
import bookRoute from "./routes/book.route.js"
import healthRoute from "./routes/health.route.js"
=======
import {userRoute} from "./routes/user.route"
import {bookRoute} from "./routes/book.route"
=======
import userRoute from "./routes/user.route.js"
import bookRoute from "./routes/book.route.js"
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)

>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend connection API!' });
});

app.use("/api/user", userRoute);
app.use("/api/Book" , bookRoute);
<<<<<<< HEAD
app.use("/api/health", healthRoute)
=======
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)






export default app;