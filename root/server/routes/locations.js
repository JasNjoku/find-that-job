const express = require('express');
const router = express.Router();

const locations = 
{
    "Drogheda": [
        "TermonAbbey",
        "Rathmullen",
        "An Rian"
    ],

    "Dundalk": [
        "DKIT",
        "Dundalk Bus Station",
        "Dundalk Town Center"
    ],

    "Balbriggan": [
        "Balbriggan Center",
        "Balbriggan School"
    ]
}

router.get('/', (req, res) => {
    res.send('Location Homepage')
})

router.get('/:location', (req, res) => {
    const locationName = req.params.location;
    if(!locations[locationName]) {
        res.send({errorMessage: 'No location found'});
    } else {
       res.json(locations[locationName])
    }
})


module.exports = router;