const { Router } = require('express');
const { Category } = require("../db/db");

const router = Router();

const categories = [
    {
        name: "Salary",
        type: "Earning"
    },
    {
        name: "Home",
        type: "Expense"
    },
    {
        name:"Car",
        type:"Expense"
    },
    {
        name:"Transport",
        type:"Expense"
    },
    {
        name:"Food",
        type:"Expense"
    },
    {
        name:"Rent",
        type:"Expense"
    },
    {
        name:"Basic services",
        type:"Expense"
    }
]

router.get("/category", async (req,res) => {
    try {
        const CreateListCategory = categories.map( async ({name,type}) => {
            return await Category.create({
                name:name,
                type:type
            })
        })
        const list_category = await Category.findAll();
        res.status(200).json(list_category);
    } catch (error) {
        res.status(400).json({error: error})
    }

})


router.post("/category", async (req,res)=> {
    try {
        const {name,type} = req.body;
        if(name && type) {
            const [category, created] = await Category.findOrCreate({
               where: {
                    name:name,
                    type:type
               }
            });
            if (created) {
                res.status(200).json({response:"New category has been created", category:name,type:type})
            } else {
                res.status(200).json({response:"Category already exists"})
            }
        } else {
            res.status(400).json({response:"No data provided"})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
})


module.exports = router;