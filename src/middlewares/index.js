
const UserModel = require("../models/user")
async function logger (req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

async function isLoggedIn (req, res, next) {
    
    let authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }
    
    // Check token
    let token;
    let user;
    let idAccount;
    console.log("in is login")
    user = await UserModel.findOne({token: part2})
    
    if (!user) {
        return res.status(401).send('You are not logged in')
    }

    // Set user
    // const [users] = await pool.query(
    //     'SELECT account_id, username, first_name, last_name, email, image, phone_number, type, image FROM account WHERE account_id = ?', [token.account_id]
    // )
    // console.log(user)
    req.user = user
    
    
    next()
}

// async function isSeller (req, res, next) {
//     const [[acc_type]] = await pool.query('SELECT acc_type FROM account WHERE account_id = ?', [req.params.account_id]);
//     console.log(acc_type);

//     if (acc_type !== 'seller') {
//         return res.status(403).send
//     } return false;

//     next();
// }

module.exports = {
    logger,
    isLoggedIn
}