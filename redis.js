require("dotenv").config()

const redis = require('redis');
const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_USER_PASSWORD}@${process.env.REDIS_HOST}`

async function redisConnect() {
    const client = redis.createClient({
        host : process.env.REDIS_HOST,
        password : process.env.REDIS_PASSWORD,
        database : 'Shubham-free-db'
    });
  
    client.on('error', (err) => console.log('Redis Client Error', err));
  
    await client.connect();
    return client
}

async function delValue(key){
    const client = await redisConnect()
    await client.del(key)
    return true
}

module.exports = {
    delValue
}