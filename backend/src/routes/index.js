const {Router} = require('express')
const router = Router();

router.get('/', (req,res) => res.json({
        mesagge: 'API rest is working......'
    }
));

module.exports = router