const {fillTotals} = require('../services/dashbaordService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
//TODO : change to index
router.get('/', pageController.getDashPage);


router.get('/totals', async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming you have authentication middleware setting this
        if (!userId) {
            return res.status(401).json({ success: false, error: 'User not authenticated' });
        }

        const totals = await fillTotals(userId);
        
        if (totals) {
            console.log(`Dashboard total request received #### O.K ####`);
            console.log('Totals:', totals);
            return res.json(totals);
        } else {
            return res.status(404).json({ success: false, error: 'No data found' });
        }
    } catch (error) {
        console.error('Error in /totals route:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;