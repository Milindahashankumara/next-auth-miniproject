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
  
  // Note: we cast to any to avoid pulling MongoClient types into this stub.
  const stubClient: any = {
    db() {
      throw new Error('MONGODB_URI environment variable is not set');
    }
  };

  clientPromise = Promise.resolve(stubClient as MongoClient);
} else {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
}

export default clientPromise;