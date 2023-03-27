const AccountClaimant = require("../models/accountclaimant")
const RightHistory = require("../models/rightHistory")

const registerAccountClaimant = async (req, res) => {
    try {
        console.log(req.body)
        const payload = req.body;
        const claimant = new AccountClaimant(payload);
        await claimant.save();
        res.status(201).send({ message: "add account claimant success" }).end();
    } catch (err) {
        console.log(err)
        res.send({ message: "fail", error: err })
    }

}


const getAllAccountClaimant = async (req, res) =>{
    try{
        data = await AccountClaimant.find()
        res.status(200).send(data).end()
    }catch(err){
        res.send({ message: "fail", error: err })
    }
}

const searchIdCard = async (req, res) =>{
    try {
        console.log(req.query.idCard)
        let data;
        let id = String(req.query.idCard)
        data = await AccountClaimant.find({'IdCard' : id})
        console.log(data)
        if(data == []){
            console.log("no data")
            res.status(204).send({message: "No idCard found please try again"}).end();
        }else{
            res.status(200).send(data).end()
        }
        
    } catch (error) {
        res.status(500).send({message: error}).end()
    }
}

const searchNameClaimant = async (req, res) => {
    try {
        console.log("Params : ")
        console.log(req.query)
        const firstname = req.query.Firstname;
        const lastname = req.query.Lastname;
        let data;
        if (lastname) {
            data = await AccountClaimant.find({
                $and: [{ "Firstname": { $regex: '.*' + firstname + '.*' } },

                { "Lastname": { $regex: '.*' + lastname + '.*' } }
                ]
            });
        } else {
            console.log("Firstname only")
            console.log(firstname)
            data = await AccountClaimant.find({
                $or: [
                    { "Firstname": { $regex: '.*' + firstname + '.*' } },
                    { "Lastname": { $regex: '.*' + firstname + '.*' } }
                ]
            });
        }
        // const data = await AccountClaimant.find({
        //     $or: [{ "Firstname": { $regex: '.*' + firstname + '.*' } },

        //     { $and: [{"Lastname": { $regex: '.*' + lastname + '.*' } }, {"Lastname" : { }}]}
        // ]
        // });

        console.log(data)
        res.status(200).send(data).end()
    } catch (err) {
        res.send({ message: "fail" })
    }
}

const searchById = async (req, res) => {
    try {
        let data;
        let acc;
        let doc;
        const id = req.params.id
        
        // console.log(id)
        acc = await AccountClaimant.findById(id)
        doc = await RightHistory.find({'ClaimantId': id})
        // console.log(acc)
        // console.log(doc)
        data = {
            accData: acc,
            docData: doc
        }
        res.status(200).send(data).end()
    } catch (error) {
        res.status(500).send({message: error}).end()
    }
}

module.exports = { registerAccountClaimant, searchNameClaimant, getAllAccountClaimant, searchIdCard, searchById }