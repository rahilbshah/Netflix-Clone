import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req,res) => {
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(req.body.password,salt);
    try {
        const newUser=new User({...req.body,password:hash})
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const Login=async(req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        if(!user) res.status(404).json("User Does not Exist")
        else{
            const validity=await bcrypt.compareSync(req.body.password,user.password)
            if(!validity){
               return res.status(400).json("Credentials Invalid")
            }else{
                const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT,{expiresIn:"5d"})
                const {password,...otherDetails}=user._doc;
                res.status(200).json({...otherDetails,token})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}