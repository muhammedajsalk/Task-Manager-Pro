import User from '../models/user';
import generateToken from '../utils/generateToken';


export const register = async (data: any) => {
  const { username, email, password } = data;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({ username, email, password });

  if (user) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
    };
  } else {
    throw new Error('Invalid user data');
  }
};


export const login = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};