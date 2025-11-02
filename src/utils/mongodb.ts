import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  clientPromise = Promise.reject(
    new Error('MONGODB_URI environment variable is not set')
  );
} else {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
}

export default clientPromise;