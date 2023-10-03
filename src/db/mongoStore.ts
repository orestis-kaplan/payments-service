import connectMongoDBSession from "connect-mongodb-session";
import expressSession from "express-session";

export const initMongoDBStore = (session: typeof expressSession) => {
  const MongoDBStore = connectMongoDBSession(session);

  const mongoStore = new MongoDBStore({
    uri: process.env.MONGODB_STORE_CONNECTION_STRING,
    collection: process.env.MONGODB_STORE_COLLECTION,
  });

  mongoStore.on("error", function (error) {
    console.log(error);
  });

  mongoStore.on("connected", function () {
    console.log("MongoDBStore connected");
  });
  return mongoStore;
};
