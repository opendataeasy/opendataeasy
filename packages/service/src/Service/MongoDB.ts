import { MongoClient } from "mongodb";
import type { Document } from "mongodb";

class MongoDB {
  #client: MongoClient;

  constructor(uri: string) {
    this.#client = new MongoClient(uri);
  }

  async close() {
    await this.#client.close();
  }

  async provision(collectionName: string, schema: object, docs: Document[]) {
    const collection = await this.#client
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
