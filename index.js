import express from 'express'
import connectDB from './config/db.js'
import cryptoRoutes from './routes/cryptoRoutes.js'
import dotenv from 'dotenv'
import schedulePriceFetching from './jobs/fetchPrices.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api', cryptoRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


schedulePriceFetching();

app.listen(PORT, () => console.log(`server running on ${PORT}`))