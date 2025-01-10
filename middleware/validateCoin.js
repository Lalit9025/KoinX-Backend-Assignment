export const validateCoin = (req, res, next) => {
    const { coin } = req.query;

    const validCoins = ['bitcoin', 'matic-network', 'ethereum'];

    if(!coin){
        return res.status(400).json({
            success: false,
            message: 'Coin parameter is required'
        })
    }
    if(!validCoins.includes(coin)){
        return res.status(400).json({
            success: false,
            message: `Invalid coin. Please use one of the following: ${validCoins.join(', ')}`
        })
    }
    next();
}