const RightHistory = require("../models/rightHistory")

const createRightHistory = async (req, res) => {
    try {
        const files = req.files;
        // console.log(files)
        const tempFile = [];
        files.forEach((val) => {
            tempFile.push({
                file_name: val.originalname,
                file_path: val.path.substring(6, val.path.lenght),
                file_type: val.mimetype
            })
        })
        // console.log(tempFile)
        const payload = {
            ClaimantId: req.body.ClaimantId,
            Document: {
                title: req.body.Title,
                files: tempFile,
                state: req.body.Status,
                time: req.body.Date
            },

        };
        const right = new RightHistory(payload);
        await right.save();
        res.status(201).send({ message: "create righthistory success" }).end();
    } catch (err) {
        console.log(err)
        res.send({ message: "fail", error: err })
    }

}
const findRightDetail = async (req, res) => {
    try {
        const id = req.params.id

        console.log(id)
        const detail = await RightHistory.find({
            ClaimantId: id
        })
        res.status(200).send(detail).end()
    } catch (err) {
        res.send({ message: "fail", error: err })
    }
}

const deleteById = async (req, res) => {
    try {
        console.log(req.params.id)
        const id = req.params.id
        await RightHistory.deleteOne({ _id: id })
        res.status(200).end()
    } catch (err) {
        res.send({ message: "fail", error: err })
    }
}


module.exports = { createRightHistory, findRightDetail, deleteById }