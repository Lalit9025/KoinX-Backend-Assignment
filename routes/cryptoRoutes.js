import express from "express";
import Crypto from "../models/Crypto.js";
import { validateCoin } from "../middleware/validateCoin.js";

const router = express.Router();


router.get('/stats', validateCoin,  async(req, res) => {
    const { coin } = req.query;

    try {
        const latestData = await Crypto.findOne({ coin })
        .sort({timestamp: -1})
        .select('price marketCap change24h');

        if(!latestData){
            return res.status(404).json({
                success: false,
                message: 'No data found for the specified coin'
            })
        }
                                
        res.json({
            success: true,
            data : {
                price: latestData.price,
                marketCap: latestData.marketCap,
                '24hChange' : latestData.change24h
            }
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'server error', error: error.message
        })
    }
});

router.get('/deviation', validateCoin, async (req, res) => {
    const { coin } = req.query;

    try {
        const data = await Crypto.find({ coin })
        .sort({ timestamp : -1})
        .limit(100)
        .select('price');

        if(data.length < 2) {
            return res.status(400).json({ 
                success: false,
                message: 'Insufficient data'
            });
        }

        const prices = data.map((entry) => entry.price);
        const mean = prices.reduce((a, b) => a + b, 0)/ prices.length;
        const variance = prices.reduce((sum, price) => 
            sum + Math.pow(price - mean, 2), 0)/prices.length;
        const stdDeviation = Math.sqrt(variance);

        res.json({ 
            success: true,
            data:{
                deviation: parseFloat(stdDeviation.toFixed(2))
            }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Internal server error', 
            error: error.message
        })
    }
})

export default router;