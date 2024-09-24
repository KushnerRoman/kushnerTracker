const {fillTotals, fillTableRecents } = require('../services/dashbaordService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
//TODO : change to index
router.get('/', pageController.getDashPage);
const logger = require('../logger');

router.get('/totals', async (req, res) => {
    try {
        const userId = req.user.email; // Assuming you have authentication middleware setting this
        if (!userId) {
            return res.status(401).json({ success: false, error: 'User not authenticated' });
        }

        const totals = await fillTotals(userId);
        
        if (totals) {
             (`Dashboard total request received #### O.K ####`);
             ('Totals:', totals);
            return res.json(totals);
        } else {
            return res.status(404).json({ success: false, error: 'No data found' });
        }
    } catch (error) {
         logger.info('Error in /totals route:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

router.get('/recentsreceivs', async (req, res) => {
    try {
        const userId = req.user.email; // Assuming you have authentication middleware setting this
        if (!userId) {
            return res.status(401).json({ success: false, error: 'User not authenticated' });
        }

        const totals = await fillTableRecents(userId);
             (totals);
        if (totals) {
            return res.json(totals);
        } else {
            return res.status(404).json({ success: false, error: 'No data found' });
        }
    } catch (error) {
         logger.info('Error in /recentsreceivs route:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;