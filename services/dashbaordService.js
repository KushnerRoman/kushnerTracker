const db = require('../db/db');
const logger = require('./logger'); 

async function fillTotals(userId){
    try {
        const parms = [userId];
        const query = `
                SELECT 
                    what, 
                    COUNT(*) AS bill_count, 
                    SUM(amount) AS total_amount, 
                    AVG(amount) AS average_amount, 
                    MIN(date) AS earliest_date, 
                    MAX(date) AS latest_date 
                FROM 
                    bills 
                WHERE 
                    WHO = ? 
                GROUP BY 
                    what, who 
                ORDER BY 
                    what ASC, total_amount DESC
                `;
                 (parms)
        const result = await db.executeGetBillsQuery(query,[parms] );

        if(result){
             ( 'the result : ',result)
            return result
        }else{
             ('Error from service result', result);
            return null;
        }

    }catch (error) {
   logger.info('Error executing query:', error);
}
}

async function fillTableRecents(userId){
    try {
        const parms = [userId];
        const query = ` SELECT  *,
                    DATE_FORMAT(date, '%d-/m') AS formatted_date
                        FROM tracker.bills 
                        WHERE who = ? 
                        ORDER BY date DESC
                `;
                 (parms)
        const result = await db.executeGetBillsQuery(query,[parms] );

        if(result){
             ( 'the result : ',result)
            return result
        }else{
             ('Error from service result', result);
            return null;
        }

    }catch (error) {
   logger.info('Error executing query:', error);
}
}
module.exports = { fillTotals, fillTableRecents } ;