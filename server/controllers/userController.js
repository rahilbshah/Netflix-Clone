import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
            );
            const { password, ...otherDetails } = updatedUser._doc
            res.status(200).json({ ...otherDetails });
        } catch (err) {
            res.status(500).json(error)
        }
    }else{
        res.status(404).json("User Does not Exist")
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(404).json("User Does not Exist")
    }

}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        try {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(404).json("User Does not Exist")
    }
}

export const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: - 1 }).limit(5)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getStats = async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
}