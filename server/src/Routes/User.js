const { Router } = require('express');
const { User } = require("../db/db");

const router = Router();


router.post("/user", async ( req, res)=> {

    const {fullName,email} = req.body;
    try {
        
        if (fullName && email) {
            const [user, created] = await User.findOrCreate({
               where: {
                    fullName,
                    email
               },
               defaults: {
                   totalBalance: 0
               }
            });
            if (created) {
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
               }
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