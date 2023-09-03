import bcrypt from "bcrypt";
import subUserValidation from "../Validation/subUserValidation.js";
import subadmin from "../Model/subUserModel.js";

export const subUserReg = async (req, res) => {


    const { fullname, email, phonenumber, password, role,gameid,game} = req.body;

    const validatedata = { fullname, email, phonenumber, password, role };
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
                fullname, phonenumber, email, password, role,gameid,game
            });

            addadmin.save();
            return res.status(200).json({ msg: "Sub Admin Added Successfully" });

        }
    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Registration Failed" });

    }

}


export const subUserLogin = async (req, res) => {
    const { username, password } = req.body;

    // Check if the provided username is an email or a phone number
    const isEmail = /^\S+@\S+\.\S+$/.test(username);
    const isPhoneNumber = /^\d{10}$/.test(username);

    let user;

    if (isEmail) {
        // If the provided username is an email, query by email
        user = await subadmin.findOne({ email: username });
    } else if (isPhoneNumber) {
        // If the provided username is a phone number, query by phone number
        user = await subadmin.findOne({ phone: username });
    } else {
        return res.status(400).json({ msg: "Invalid username format" });
    }

    if (!user) {
        return res.status(400).json({ msg: "User Not Found" });
    }

    try {
        const match = await bcrypt.compare(password, user.password);

        // if (match) {
        //     return res.status(200).json({ data: { id: user._id, name: user.fullname, email: user.email, role: user.role } });
        // } else {
        //     return res.status(400).json({ msg: "Password Did not Matched !!" });
        // }

        if (user.password === password) {
            return res.status(200).json({ data: { id: user._id, name: user.fullname, email: user.email, role: user.role } });
        } else {
            return res.status(400).json({ msg: "Password Did not Matched !!" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Signin Failed !!" });

    }
}