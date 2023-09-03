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