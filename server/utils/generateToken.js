import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: '15d'
  });

  // Postavljanje tokena u cookie header
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${15 * 24 * 60 * 60}; Path=/`);
};

export default generateTokenAndSetCookie;
