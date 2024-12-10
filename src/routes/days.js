const express = require('express');
const router = express.Router();

router.get('/day/:num/:part', async (req, res, next) => {
    const dayNum = req.params.num;
    const part = req.params.part;
    try { 
        const modulePath = `../days/${dayNum}.js`; 
        const module = require(modulePath); 
        if (module && typeof module.run === 'function') { 
            const result = await module.run(dayNum, part, module);
            res.send(`${result}`); 
        } else {
            res.status(500).send('Invalid module or function'); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error in module for day ${dayNum}, part ${part}`);
    }
});

module.exports = router;