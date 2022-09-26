import { MongoClient } from "mongodb";
import type { Document } from "mongodb";

class MongoDB {
  #client: MongoClient;

  constructor(uri: string) {
    this.#client = new MongoClient(uri);
  }

  static async close(mongodb: MongoDB) {
    await mongodb.#client.close();
  }

  static async provision(
    mongodb: MongoDB,
    collectionName: string,
    schema: object,
    docs: Document[]
  ) {
    const collection = await mongodb.#client
      .db()
      .createCollection(collectionName, {
        validator: {
          $jsonSchema: schema,
        },
      });
    return collection.insertMany(docs);
  }
}

export default MongoDB;
