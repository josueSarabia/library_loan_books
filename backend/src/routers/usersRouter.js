const express = require("express")
const router = express.Router()
const { models } = require("../database/database")
const { getMissingValues } = require("./utils")


router.get("/:id/", async (req, res) => {
    const id = req.params.id

    // validate id
    if (!id) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: "missing user id"
        })
    }

    const user = await models.User.findAll({
        where: {
            id: id
        }
    })

    res.status(200).send({user: user[0]})
})

router.get("/email/:email/", async (req, res) => {
    const email = req.params.email

    // validate id
    if (!email) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: "missing user email"
        })
    }

    const user = await models.User.findAll({
        where: {
            email: email
        }
    })

    res.status(200).send({user: user[0]})
})

router.post("/signup/", async (req, res) => {
    // read body of the request
    const userRequest = req.body
 
    const user = {
        name: userRequest.name,
        lastName: userRequest.lastName,
        address: userRequest.address,
        email: userRequest.email,
        userType: userRequest.userType,
        password: userRequest.password,
    }

    // validate that the request has no missing values
    const missingValues = getMissingValues(user)
    if (missingValues.length > 0) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: `following properties are missing: ${missingValues.toString()}`
        })
    }

    // find if the user email already exixts
    const isUserInDB = await models.User.findAll({
        where: {
            email: user.email
        }
    })
    if (isUserInDB.length > 0) {
        return res.status(409).send({
            error: "EMAIL ALREADY EXISTS",
            detail: `the email ${user.email} already exists`
        })
    }

    // create the user
    const newUser = await models.User.create(user)
    delete newUser.password
    res.status(201).send(newUser)
})

router.put("/", async (req, res) => {
    const user = req.body
    // validate id

    if (!user.id) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: "missing user id"
        })
    }

    const missingValues = getMissingValues(user)
    if (missingValues.length > 0) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: `following properties are missing: ${missingValues.toString()}`
        })
    }

    // find if the user email already exist
    const isUserEmailInDB = await models.User.findAll({
        where: {
            email: user.email
        }
    })
    if (isUserEmailInDB.length > 0 && isUserEmailInDB[0].id !== user.id) {
        return res.status(409).send({
            error: "EMAIL ALREADY EXISTS",
            detail: `the emal ${user.email} already exists`
        })
    }

    // update the user
    await models.User.update(user, {
        where: {
            id: user.id
        }
    })
    res.status(204).send()

})

router.delete("/:id/", async (req, res) => {

    const id = req.params.id

    // find if the user exixts
    const isUserInDB = await models.User.findAll({
        where: {
            id: id
        }
    })
    if (isUserInDB.length === 0) {
        return res.status(204).send()
    }


    // cant delete if user has open loans
    const userLoans = await models.Loan.findAll({
        where: {
            user: id
        }
    })
    if (userLoans.length > 0) {
        return res.status(409).send({
            error: "BAD REQUEST",
            detail: `cant delete the account with id ${id} because the user has pending loans `
        })
    }

    // delete the user
    await models.User.destroy({
        where: {
            id: id
        }
    })

    res.status(204).send()

})


module.exports = router