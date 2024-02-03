const express = require('express')
router = express.Router()

router.get('/',(req, res) => {
   res.send('lista de locais')
})

module.exports = router