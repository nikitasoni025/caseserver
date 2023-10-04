import bcrypt from "bcrypt";
import subUserValidation from "../Validation/subUserValidation.js";
import subadmin from "../Model/subUserModel.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



const createJwtToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
}

export const getCokkie = async (req, res) => {

    const cookie = req.headers.cookie;


    if (!cookie || cookie === null) {
        return res.sendStatus(401);
    }

    const token = cookie.split('=')[1];

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Token Verification Failed" }); // Token verification failed
        }


        const payload = decoded;

        try {

            const user = await subadmin.findById(payload._id);

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }


            return res.status(200).json({ msg: 'Logged In User Found', data: { id: user._id, name: user.fullname, email: user.email, role: user.role, token, profilepic: user.profilepic } });
        } catch (error) {

            console.error(error);
            return res.status(500).json({ msg: 'Server error' });
        }
    });

}

export const subUserReg = async (req, res) => {

    const { fullname, email, phonenumber, password, profilepic } = req.body;

    const validatedata = { fullname, email, phonenumber, password, profilepic };
    const { error, value } = subUserValidation.validate(validatedata);

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ msg: "Validation Error !!", valerror: errors })
    }

    try {
        const preuser = await subadmin.findOne({ email: email });
        if (preuser) {
            return res.status(400).json({ msg: "Sub Admin is Already present" });
        }
        else {
            const hashedpassword = await bcrypt.hash(password, 10);
            const addadmin = new subadmin({
                fullname, phonenumber, email, password: hashedpassword, profilepic
            });

            const savedUser = await addadmin.save().then(() => {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "animeshverma161@gmail.com",
                        pass: process.env.APP_PASSWORD,
                    },
                });
                const mailOptions = {

                    from: "animeshverma161@gmail.com",
                    to: email,
                    subject: "Registration Successfull Welcome To SRBOSS",
                    html: `<div class="main" style="width:90%;height:100%;background:#2a2a2a;padding:25px;border-radius:10px;font-family:sans-serif;color:#fff;position:relative"><h1 style="color:#adff2f">Welcome ${fullname} To SRBOSS</h1><h3 style="color:#f0f8ff">Your True Satta Partner</h3><p>You have Been Successfully Registered As<span style="color:#adff2f">Admin</span></p><p>With Your Username as<span style="color:#adff2f"> ${email} or ${phonenumber} </span>and</p><p>Your Password as <span style="color:#adff2f">${password}</span></p><p>Click Here<a style="text-decoration:none;color:#69b9ff" href="https://srboss.netlify.app/admin/dash">Master Panel</a>To Get Started, SRBOSS.COM Awaits Your Presence</p><p>Thank You</p></div> `

                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ msg: "Email not sent" });
                    }
                    else {
                        console.log(`Email sent` + info);
                        return res.status(200).json({ msg: "Sub Admin Registered Successfully" });
                    }
                });


            })
        }
    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Registration Failed" });

    }

}


export const subUserLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "All Fields Are Required" });
    }

    const isEmail = /^\S+@\S+\.\S+$/.test(username);
    const isPhoneNumber = /^\d{10}$/.test(username);

    let user;



    if (isEmail) {
        // If the provided username is an email, query by email
        user = await subadmin.findOne({ email: username });
    } else if (isPhoneNumber) {
        // If the provided username is a phone number, query by phone number
        user = await subadmin.findOne({ phonenumber: username });
    } else {
        return res.status(400).json({ msg: "Invalid username format Required Email or Phone" });
    }

    if (!user) {
        return res.status(400).json({ msg: "User Not Found" });
    }

    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = createJwtToken(user._id);
            res.cookie("authToken", token, {
                path: "/",
                maxAge: 14 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none", 
                secure: true,  
            });
            return res.status(200).json({ data: { id: user._id, name: user.fullname, email: user.email, role: user.role, token, profilepic: user.profilepic } });
        } else {
            return res.status(400).json({ msg: "Password Did not Matched !!" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Signin Failed !!" });

    }
}

export const fetchAdminsWithFilter = async (req, res) => {

    const limit = req.query.limit || 5;
    const page = req.query.page;

    const startIndex = (page - 1) * limit;
    try {
        const count = await subadmin.countDocuments();
        const userData = await subadmin.find().skip(startIndex).limit(limit);
        return res.status(200).json({ data: userData, totalCount: count });

    } catch (error) {
        return res.status(400).json({ msg: "fetching failes", error: error.message });

    }

}

export const fetchAdminsWithEmail = async (req, res) => {
    let email = req.query.email;

    let admins;
    try {
        if (email) {
            admins = await subadmin.find({ email: { $regex: `^${email}` } });

        } else {
            admins = await subadmin.find();
        }
        return res.status(200).json(admins);

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }

}
export const fetchAdminsWithId = async (req, res) => {
    let id = req.query.id;
    let admins;
    try {
        if (id) {
            admins = await subadmin.findById(id);

        } else {
            return res.status(400).json({ msg: "Id is Required" });
        }
        return res.status(200).json(admins);

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }

}

export const subUserLogout = async (req, res) => {

    res.clearCookie("authToken", { path: '/' });
    return res.status(200).json({ mag: "Cookie Cleared" });
}

export const deleteAdmin=async(req,res)=>{
    try {
        const admin=await subadmin.findById(req.params.id);
        
        if(admin){
            await admin.deleteOne();
            return res.status(200).json({msg:"User Deleted Successfully"});
        }else{
            return res.status(400).json({msg:"Requested User Not Found"}); 
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"Deletion Failed From The Server"});
    }

}