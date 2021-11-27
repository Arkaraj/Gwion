import cron from "node-cron";
import {
  getGithubCount,
  getInstagramCount,
  getTwitterCount,
  getLinkedInCount,
} from "./scrapper";
import db from "./db";

runEveryDay = async () => {
  const [gCount, iCount, tCount, lCount] = await Promise.all([
    getGithubCount(),
    getInstagramCount(),
    getTwitterCount(),
    getLinkedInCount(),
  ]);
  db.get("github").push({ date: new Date(), count: gCount }).write();
  db.get("twitter").push({ date: new Date(), count: tCount }).write();
  db.get("instagram").push({ date: new Date(), count: iCount }).write();
  db.get("linkedin").push({ date: new Date(), count: lCount }).write();
  console.log("Done! Pushing");
};

cron.schedule("0 0 0 * * *", () => {
  // will run every day at 12:00 AM
  runEveryDay();
});
