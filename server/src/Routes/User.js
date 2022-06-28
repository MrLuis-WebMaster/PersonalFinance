const { Router } = require('express')
const axios = require('axios');
const config = require("../config/config")
const { User, Earning, Expense } = require("../db/db");

const router = Router();

router.post("/user", async ( req, res)=> {
    const {fullName,email,country} = req.body;
    try {
        if (fullName && email && country) {
            const fetchCountries = await axios.get(`${config.URL}/countries`);
            const {currency} = fetchCountries.data.AllCountries.find( e => e.name === country )
            const [user, created] = await User.findOrCreate({
               where: {
                    fullName,
                    email,
                    country,
                    currency
               },
               defaults: {
                   totalBalance: 0
               },
            });
            if (created) {
                console.log(created)
                res.status(200).json({Name:fullName, Email:email})
            } else {
                res.status(200).json({response:"User already exists"})
            }
        } else {
            res.status(400).json({response:"No data provided"})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.get("/user", async ( req, res, next )=> {
    const {email} = req.query;
    try {
        if (email) {
            const userInfo = await User.findOne({
               where: {
                    email:email
               },
               include: [Earning,Expense]
            });

            if (userInfo) {
                res.status(200).json({userInfo})
            } else {
                res.status(400).json({response:"Not Found"})
            }

        } else {
            res.status(400).json({response:"No data provided"})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
})


module.exports = router;