import nc from 'next-connect';
import bcrypt from 'bcryptjs'; 
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextAuth } from 'next-auth/client';
import db from '../../../utils/db';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';


const handler = nc();
handler.post(async(req,res)=>{
await db.connect();
const user = await User.findOne({email: req.body.email});
await db.disconnect();
if(user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
  res.send({
      token,
      _id: user._id,
        name: user.name,
        email: user.email,
         isAdmin: user.isAdmin
  });
}else{
    res.status(401).send({message: 'Invalid User or password'});
}
});

export default handler;