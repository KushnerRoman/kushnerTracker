const db = require('../db/db');


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
                console.log(parms)
        const result = await db.executeGetBillsQuery(query,[parms] );

        if(result){
            console.log( 'the result : ',result)
            return result
        }else{
            console.log('Error from service result', result);
            return null;
        }

    }catch (error) {
  console.error('Error executing query:', error);
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
                console.log(parms)
        const result = await db.executeGetBillsQuery(query,[parms] );

        if(result){
            console.log( 'the result : ',result)
            return result
        }else{
            console.log('Error from service result', result);
            return null;
        }

    }catch (error) {
  console.error('Error executing query:', error);
}
}
module.exports = { fillTotals, fillTableRecents } ;