import { Request, Response } from 'express';
import { User } from '../models/User';
import { sendPasswordResetEmail } from '../utils/sendEmail';
import * as crypto from "crypto";

export class ForgotPasswordController {
  async initiatePasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
  
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate password reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetToken = resetToken;
      var date =new Date();
      date.setDate(date.getDate() + 1);

      user.resetTokenExpiresAt = date; // 1 hour
      await user.save();
  
      // Send email with password reset link
      const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;
      await sendPasswordResetEmail(user.email, resetUrl);
  
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
export default new ForgotPasswordController();
