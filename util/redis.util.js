const dotenv = require('dotenv');
const redis = require('redis');

dotenv.config();

const redisClient = redis.createClient({
   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
   legacyMode: true,
});
redisClient.on('connect', () => {
   console.info('Redis 연결 확인');
});
redisClient.on('error', (err) => {
   console.error('Redis Client 에러', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용

module.exports = redisCli