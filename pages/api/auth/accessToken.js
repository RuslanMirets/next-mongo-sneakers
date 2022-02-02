/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB';
import jwt from 'jsonwebtoken';
import Users from '../../../models/userModel';
import { createAccessToken } from '../../../utils/generateToken';

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ error: 'Пожалуйста, авторизируйтесь' });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN);
    if (!result)
      return res.status(400).json({ error: 'Ваш токен неверен или срок его действия истек' });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ error: 'Пользователь не найден' });

    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
