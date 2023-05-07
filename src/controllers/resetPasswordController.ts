import { Request, Response } from 'express';
import { User } from '../models/User';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

export class ResetPasswordController {
  async sendResetEmail(req: Request, res: Response){
    try {
      const { token } = req.params;
      const { password } = req.body;
  
      // Find user by reset token and check expiration
      const user = await User.findOne({ 
        where: { 
          resetToken: token, 
          resetTokenExpiresAt: { [Op.gt]: Date.now() } 
        } 
      });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Update user's password and clear reset token
      user.password = encryptedPassword;
      user.resetToken = null;
      user.resetTokenExpiresAt = null;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
export default new ResetPasswordController();
