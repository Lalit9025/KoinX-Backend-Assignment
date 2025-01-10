import axios from 'axios';
import Crypto from '../models/Crypto.js';
import cron from 'node-cron';

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

const fetchCryptoPrices = async () => {
    try {
       
        // Fetching the cryptocurrency prices from CoinGecko 
        const response = await axios.get(COINGECKO_API_URL, {
            params: {
                ids: COINS.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true,
            },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'CryptoPrice-Fetcher/1.0'
            }
        });

        const updates = [];

        // iterating through each coin and saving its data in the database
        for (const coin of COINS) {
            const data = response.data[coin];

            if (!data) {
                console.error(`No data received for ${coin}`);
                continue;
            }

            try{
                const newEntry = new Crypto({
                    coin,
                    price: data.usd, 
                    marketCap: data.usd_market_cap, 
                    change24h: data.usd_24h_change, 
                });

                updates.push(newEntry.save());
                console.log(`Data prepared for ${coin}: Price: $${data.usd}`);
            } catch(err) {
                console.error(`Error preparing data for ${coin}:`, err);
            }
        }

        await Promise.all(updates);
        console.log('Price update complted successfully')

    } catch (error) {
        console.error('Price fetch failed:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
};

// Scheduling the fetchCryptoPrices function to run every 2 hours
const schedulePriceFetching = () => {
    console.log('Scheduling price fetch job for every 2 hours');
    
    //initial run
    fetchCryptoPrices();
    
    return cron.schedule('0 */2 * * *', fetchCryptoPrices, {
        scheduled: true,
        timezone: "UTC"
    });
};


export default schedulePriceFetching;
