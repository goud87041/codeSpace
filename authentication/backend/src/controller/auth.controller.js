<<<<<<< HEAD
<<<<<<< HEAD
import User from '../model/user.model.js';
=======
import User from '../models/user.model.js';
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
=======
import User from '../model/user.model.js';
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });     
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

<<<<<<< HEAD
<<<<<<< HEAD
export  { registerUser, userLogin, getUserProfile };
=======
export { registerUser, userLogin, getUserProfile };
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
=======
export  { registerUser, userLogin, getUserProfile };
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)



