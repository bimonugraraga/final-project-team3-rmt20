// const cron = require("node-cron");
// const earthQuakeSchema = require("../schema/eqAPI");
// const userMongoDb = require("../schema/userMongoDb");
// const { redis } = require("../config/connectRedis");

// const expoUrl = "https://exp.host/--/api/v2/push/send";

// const notifEarthquake = cron.schedule("* * * * *", async () => {
//   // console.log("running a task every minute");
//   const recentEq = await earthQuakeSchema.resolvers.Query.getRecentEarthquake();
//   console.log(recentEq);
//   const cacheEq = await redis.get("recentEarthquake");
//   const eq = JSON.parse(cacheEq);
//   // if (recentEq.dateTime !== eq.dateTime) {

//   // }
//   const users = await userMongoDb.resolvers.Query.getAllMongoUsers();
//   let expoTokens = users.map((el) => {
//     return el.expoToken;
//   });
//   console.log(expoTokens, "<<<<<<<");
//   let message = {
//     to: expoTokens,
//     sound: "default",
//     title: "Info Gempa",
//     body: `${recentEq.area}`,
//   };

//   return axios({
//     method: "POST",
//     url: expoUrl,
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     data: JSON.stringify(message),
//   });
// });

// module.exports = { notifEarthquake };
