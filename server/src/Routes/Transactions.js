const { Router } = require('express')
const { Earning, Expense, User } = require("../db/db");

const router = Router();

router.post("/addIncome", async ( req, res)=> {
    try {
        const { transaction: {amount, concept, date, type, category}, id} = req.body;
        if (amount && concept && date && type && category && id) {
            const createTransaction = await Earning.create({
                amount,
                concept,
                date,
                type,
                category
            })
            const user = await User.findByPk(id)
            const result = await user.addEarning(createTransaction)
            res.status(201).json({info:result})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
})

router.post("/addExpense", async ( req, res )=> {
    try {
        const { transaction: {amount, concept, date, type, category}, id} = req.body;
        if (amount && concept && date && type && category && id) {
            const createTransaction = await Expense.create({
                amount,
                concept,
                date,
                type,
                category
            })
            const user = await User.findByPk(id)
            const result = await user.addExpense(createTransaction)
            res.status(201).json({info:result})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
})


router.post("/lastTransactions", async ( req, res )=> {
    try {
        const { id } = req.body;
        if (id) {
            const Earnings = await Earning.findAll({
                where:{
                    UserId:id
                }
            })
            const Expenses = await Expense.findAll({
                where:{
                    UserId:id
                }
            })

            const totalTransactions = Earnings.concat(Expenses)

            const  orderTransactionsByDate = totalTransactions.map(e=>e).sort( (a,b) => new Date(b.date) - new Date(a.date)).slice(0,10)
            
            res.status(201).json(orderTransactionsByDate)
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
})


module.exports = router;