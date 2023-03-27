const express = require("express")
const {logger} = require("./src/middlewares")


const app = express();
const cors = require('cors')
const bp = require('body-parser')
let port = process.env.PORT || 3000;

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(logger)

app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const indexRouter = require("./src/routes/index")
const userRouter = require("./src/routes/user")
const accountClaimantRouter = require("./src/routes/accountClaimant")
const rightHistoryRouter = require("./src/routes/rightHistory")

app.use(indexRouter.router)
app.use(userRouter.router)
app.use(accountClaimantRouter.router)
app.use(rightHistoryRouter.router)

require("./src/config/mongoose-conect")

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })