import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      // Get user input
      const { name, email, password } = req.body;

      // Validate user input
      if (!(email && password && name)) {
        return res.status(400).json({ message: 'All input is required' });
      }
  
      // Check if user already exist
      const oldUser = await User.findOne({ where: { email } });
  
      if (oldUser) {
        return res.status(409).json({ message: 'User Already Exist. Please Login' });
      }
  
      // Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in database
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
  
      // Return new user
      res.status(201).json({ user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error occurred while registering user' });
    }
  };

  async login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async logout (req: Request, res: Response) {
  // res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout successfulY' });
}

}

export default new AuthController();
