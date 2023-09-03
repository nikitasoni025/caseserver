import admins from "../Model/Adminmodel.js";
import adminValidationSchema from "../Validation/Adminvalidation.js";
import bcrypt from "bcrypt";

export const subUserReg = async (req, res) => {


    const { fullname, email, phonenumber, password, role} = req.body;

    const validatedata = { fullname, email, phonenumber, password, role };
    const { error, value } = adminValidationSchema.validate(validatedata);

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ msg: "Validation Error !!", valerror: errors })
    }

    try {
        const preuser = await admins.findOne({ email: email });
        if (preuser) {
            return res.status(400).json({ msg: "Admin is Already present" });
        }
        else {

            const hashedpassword = await bcrypt.hash(password, 10);
            const addadmin = new admins({
                fullname, phonenumber, email, password: hashedpassword, role
            });

            addadmin.save();
            return res.status(200).json({ msg: "Admin Added Successfully" });

        }
    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Registration Failed" });

    }

}