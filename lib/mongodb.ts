import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error(
    "Missing MONGODB_URI environment variable. Add it to .env.local (see .env.local.example)."
  );
}

// In development, Next.js hot-reloads modules on every file change, which
// would create a brand new MongoClient (and a new connection) on every
// request and quickly exhaust the connection pool. We cache the client
// on the global object so it survives module reloads. In production
// there is no HMR, so a plain module-scoped client is fine.
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Explicitly use the "hr_portal" database regardless of what's in the URI.
const dbPromise: Promise<Db> = clientPromise.then((client) => client.db("hr_portal"));

export { dbPromise, clientPromise };
