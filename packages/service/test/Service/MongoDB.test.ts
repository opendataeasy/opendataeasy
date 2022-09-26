import { MongoClient, ObjectID } from "mongodb";
import type { CollectionInfo } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import MongoDB from "../../src/Service/MongoDB";
import fixture from "./MongoDB.fixture";

describe("MongoDB", () => {
  let client: MongoClient;
  let instance: MongoMemoryServer;
  let mongodb: MongoDB;
  let uri: string;

  beforeAll(async () => {
    instance = await MongoMemoryServer.create();

    uri = `${instance.getUri()}sandbox`;
    client = new MongoClient(uri);
    mongodb = new MongoDB(uri);
  });

  afterAll(() =>
    Promise.allSettled([
      instance.stop(),
      client.close(),
      MongoDB.close(mongodb),
    ])
  );

  afterEach(() => client.db().dropCollection(fixture.collectionName));

  describe("provision", () => {
    it("should provision collection with docs", async () => {
      await MongoDB.provision(
        mongodb,
        fixture.collectionName,
        fixture.schema,
        fixture.docs
      );

      const actual = await client
        .db()
        .collection(fixture.collectionName)
        .find()
        .toArray();

      expect(actual).toEqual(fixture.docs);
    });

    it("should provision collection with schema", async () => {
      await MongoDB.provision(
        mongodb,
        fixture.collectionName,
        fixture.schema,
        fixture.docs
      );

      // TODO (sharils): Remove `as`
      const actual = (await client
        .db()
        .listCollections({ name: fixture.collectionName })
        .next()) as CollectionInfo;

      expect(actual?.options?.validator.$jsonSchema).toEqual(fixture.schema);
    });

    it("should return insertion result", async () => {
      const res = await MongoDB.provision(
        mongodb,
        fixture.collectionName,
        fixture.schema,
        fixture.docs
      );

      expect(res).toEqual({
        acknowledged: true,
        insertedCount: fixture.docs.length,
        insertedIds: fixture.docs.reduce(
          (insertedIds, insertedId, idx) => ({
            ...insertedIds,
            [idx]: expect.any(ObjectID),
          }),
          {}
        ),
      });
    });
  });
});
