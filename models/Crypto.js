import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
    coin: { 
        type: String, 
        required: true,
        enum: ['bitcoin', 'ethereum', 'matic-network'],
        trim: true,
    },
    price: { 
        type: Number, 
        required: true,
        min: 0,
    },
    marketCap: { 
        type: Number, 
        required: true,
        min: 0,
    },
    change24h : { 
        type: Number, 
        required: true,
    },
    timestamp : { 
        type: Date, 
        default: Date.now,
    },
})

export default mongoose.model('Crypto', cryptoSchema);