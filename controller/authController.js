const Auth = require('../model/authModel')
const bcrypt = require('bcryptjs')
const { createAccToken,createRefToken } = require('../util/token');
const jwt = require('jsonwebtoken');


const authController = {
    register: async (req,res) => {
        try {
            const { name, email, mobile, password, profession } = req.body;

            const passHash = await bcrypt.hash(password, 10)

            const newUser = await Auth({
                name,
                email,
                mobile,
                profession,
                password: passHash
            })
            await newUser.save()
            res.status(200).json({ msg: "User registered successfully"})
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req,res) => {
        try {
            const { email, password } = req.body;

            const extUser = await Auth.findOne({ email })
            if (!extUser)
                    return res.status(400).json({ msg: "user doesn't exists."})

            const isMatch = await bcrypt.compare(password, extUser.password);
            if (!isMatch)
                return res.status(400).json({msg: "password doesn't match "})

            // res.json({ data: extUser })
            const accessToken = createAccToken({id: extUser._id })
            const refreshToken = createRefToken({id: extUser._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                signed: true,
                path: `/api/v1/auth/refreshToken`,
                maxAge: 1 * 24 * 60 * 60 *1000
            })

            res.json({ accessToken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req,res) => {
        try {
            res.clearCookie('refreshToken', { path: `/api/v1/auth/refreshToken` })
            return res.status(200).json({ msg: "Successfully Logout"})

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const ref = req.signedCookies.refreshToken;
            //res.json({ ref })
            if (!ref)
                return res.status(400).json({ msg: 'Session Expired.. Login Again..' })

            jwt.verify(ref, process.env.REF_TOKEN_SECRET, (err, user) => {
                if (err)
                    return res.status(400).json({ msg: "Invalid Auth..Login Again.." })
                const accessToken = createAccToken({ id: user.id })
                res.json({ accessToken })
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            let { email, password } = req.body;

            let extUser = await Auth.findOne({ email })
            if (!extUser)
                return res.status(400).json({ msg: "User doestn't exists." })

            let newPass = bcrypt.hash(password, 10);

            await Auth.findByIdAndUpdate({ id: extUser._id }, {
                password: newPass
            });

            return res.status(200).json({ msg: "password updated successfully." });

        } catch (err) {
            return res.status(500).json({msg: err.message })
        }
    },
    getUserInfo: async (req, res) => {
        try {
            // res.json({ data: req.user })
            const data = await Auth.findById({ _id: req.user.id }).select('-password')
            res.json({user: data})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addToCart: async (req,res) => {
            try {
                const user = await Auth.findById({_id: req.user.id})
                    if(!user)
                        return res.status(400).json({msg: "User doesn't exists"})

                await Auth.findOneAndUpdate({_id: req.user.id}, {
                    cart: req.body.cart
                });

                return res.status(200).json({msg:"Product added to cart"})
            } catch(err) {
                return res.status(500).json({ msg: err.message })
            }
    },    
    getAllUsers: async (req,res) => {
        try {
            const data = await Auth.find().select("-password")

            const filterUsers = data.filter(item => item.role !== 'superadmin')
            return res.status(200).json({
                users: filterUsers,
                length: filterUsers.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})            
        }
    },
    profileUpdate: async (req, res) =>{
        try {
            let id = req.params.id
            let {name, email, mobile, profession} = req.body
            await Auth.findOneAndUpdate({ _id: id}, {name, profession, email, mobile})
            return res.status(200).json({ msg: "userProfile Updated"})
            // res.json(req.body)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    profileDelete: async (req, res) =>{
        try {
            let id = req.params.id            
            await Auth.findOneAndDelete({_id: id})
            return res.status(200).json({ msg: "userProfile Deleted"})
            // res.json(req.body)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = authController