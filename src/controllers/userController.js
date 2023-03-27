
const { request } = require("express");
const accountClaimantModel = require("../models/accountclaimant");
const UserModel = require("../models/user")



function generateToken() {
    const result = [];
    const characters = '*/=-$#!@^&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 100; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    return result.join('');
}

const registerPeople = async (req, res) => {
    try {
        
        let request = req.body
        console.log(request)
        let payload = {
            Email: request.Username,
            Password: request.Password,
            Firstname: request.Firstname,
            Lastname: request.Lastname,
            EmployeeId: null,
            type: request.Type,
            token: request.Token
        }
        
        const user = new UserModel(payload);
        let payloadAcc = {
            IdCard: request.IdCard,
            Firstname: request.Firstname,
            Lastname: request.Lastname,
            Age: parseInt(request.Age),
            Job: request.Job,
            TimesOfRequest: 0,
            UserIdRef: user._id
        }
        console.log(user)
        console.log(payloadAcc)
        const acc = new accountClaimantModel(payloadAcc);
        await acc.save();
        await user.save();
        res.status(201).send({ message: "register success" }).end();
    } catch (error) {
        res.send({ message: "fail", error: error })
    }
}

const registerAccount = async (req, res) => {
    try {
        console.log(req.body)
        // const passwordEncrpt = await bcrypt.hash(req.body.Password, 5)
        // console.log(passwordEncrpt)
        // const payload = 
        //     {
        //         EmployeeId: req.EmployeeId,
        //         Email: req.body.Email,
        //         Password: passwordEncrpt,
        //         Firstname: req.body.Firstname,
        //         Lastname: req.body.Lastname
        //     }
        const payload = req.body;
        const user = new UserModel(payload);
        await user.save();
        res.status(201).send({ message: "register success" }).end();
    } catch (err) {
        res.send({ message: "fail", error: err })
    }

}

const loginUser = async (req, res) => {
    try {
       

        const user = await UserModel.findOne({ Email: req.body.email.toLowerCase() });
        // const condition = await bcrypt.compare(user.Password, req.body.password)
        const validPassword = await user.verifyPassword(req.body.password);
        
        if (!user || !validPassword) {
            res.status(401).send({
                status: "failed",
                message: "Username or Password is incorrect",
                User: null
            });
        }
        const gentoken = generateToken()
        // user.token = gentoken
        // console.log(user)
        // await UserModel.updateOne(user)
        // const payload =  {
        //             EmployeeId: user.EmployeeId,
        //             Email: user.Email,
        //             Firstname: user.Firstname,
        //             Lastname: user.Lastname,
        //             token
        //         }
        const update = await UserModel.updateOne({ Email: req.body.email }, { token: gentoken }, { multi: true })
        res.status(200).send({
            status: "success",
            message: { token: gentoken },
            User: null
        });
    } catch (err) {

    }
}

module.exports = { registerAccount, loginUser, registerPeople }