/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
import validation from '../../../utils/validations';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const errMsg = validation(firstName, lastName, email, password);
    if (errMsg) return res.status(400).json({ error: errMsg });

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ error: 'Пользователь с таким email уже существует' });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({ firstName, lastName, email, password: passwordHash });

    await newUser.save();

    res.json({ msg: 'Успешная регистрация!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
