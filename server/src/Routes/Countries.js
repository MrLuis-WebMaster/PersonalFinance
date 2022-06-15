const { Router } = require('express');
const axios = require('axios')

const router = Router();


router.get("/countries", async ( req, res) => {
    try {
        const fetchCountries = await axios.get("https://restcountries.com/v3.1/all");
        const { data } = fetchCountries

        const AllCountries = data.map( ({  name, currencies}) => {
            const {common} =  name
                if (typeof currencies === 'object') {
                    let key = Object.keys(currencies)
                    return {
                        name: common,
                        currency: key[0]
                    }
                }
        })
        .filter(e => e )
        .sort( (a,b) => a.name < b.name ? -1 : 1)

        res.status(200).json({AllCountries})

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
})


module.exports = router;