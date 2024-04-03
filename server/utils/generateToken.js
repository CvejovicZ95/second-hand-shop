import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: '15d'
  });

  res.cookie('token',token,{
    maxAge:24*60*60*1000,
    httpOnly:true,
    sameSite:'strict',
  });
  //return token
};

export default generateTokenAndSetCookie;
