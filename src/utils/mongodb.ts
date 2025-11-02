import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client;
let clientPromise: Promise<MongoClient>;

// If MONGODB_URI is not set (common in build environments), do NOT call
// new MongoClient(uri) because the driver will attempt to read string
// methods (like startsWith) on the uri and throw. Instead, create a
// rejected promise so imports don't throw during module initialization —
// the error will be raised when code actually attempts to use the DB.
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