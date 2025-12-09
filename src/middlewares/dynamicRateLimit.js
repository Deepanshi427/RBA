const rateStore = new Map();

module.exports = function dynamicRateLimit({windowMs = 60000, max = 10}){
    return (req ,res ,next) =>{
        const key = req.user?._id || req.ip;
        const now = Date.now();

        if(!rateStore.has(key)){
            rateStore.set(key, []);
        }
        let timestamps = rateStore.get(key);

        timestamps = timestamps.filter(ts => now - ts< windowMs);
        if(timestamps.length >= max){
            return res.status(429).json({success: false, message:"Too many requests. Slow down!"});

        }
        timestamps.push(now);
        rateStore.set(key, timestamps);

        next();
    };
}


























