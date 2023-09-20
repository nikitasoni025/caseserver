import bcrypt from "bcrypt";
import subUserValidation from "../Validation/subUserValidation.js";
import subadmin from "../Model/subUserModel.js";
import jwt from 'jsonwebtoken';



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
      
            
            return res.status(200).json({ msg: 'Logged In User Found', data: { id: user._id, name: user.fullname, email: user.email, role: user.role, token } });
          } catch (error) {
            
            console.error(error);
            return res.status(500).json({ msg: 'Server error' });
          }
    });

}

export const subUserReg = async (req, res) => {

    const { fullname, email, phonenumber, password, role, gameid, game } = req.body;

    const validatedata = { fullname, email, phonenumber, password, role, gameid, game };
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
                fullname, phonenumber, email, password: hashedpassword, role, gameid, game
            });

            const savedUser = await addadmin.save();
            const token = createJwtToken(savedUser._id);
            return res.status(200).json({ msg: "Sub Admin Added Successfully", token });

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
        if (user.password === password) {
            const token = createJwtToken(user._id);
            res.cookie("authToken", token, {
                path: "/",
                maxAge: 14 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json({ data: { id: user._id, name: user.fullname, email: user.email, role: user.role, token } });
        } else {
            return res.status(400).json({ msg: "Password Did not Matched !!" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Signin Failed !!" });

    }
}

export const subUserLogout = async (req, res) => {

    res.clearCookie("authToken", { path: '/' });
    return res.status(200).json({ mag: "Cookie Cleared" });
}