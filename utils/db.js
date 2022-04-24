import mongoose from "mongoose";

const connection = {};
async function connect() {
  // if (connection.isConnected) {
  //   console.log("alreadyConnected");
  //   return;
  // }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Used existing connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  });
  console.log("new connection");
  connection.isConnected = db;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      console.log("Disconnected from mongoDB");
    } else {
      console.log(
        "Disconnecting from mongoDB is not allowed in development mode"
      );
    }
  }
}

function convertDocumentToObject(document) {
  document._id = document._id.toString();
  return document;
}

const db = { connect, disconnect, convertDocumentToObject };
export default db;
