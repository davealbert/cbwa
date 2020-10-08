const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const DB_NAME = "book-store";
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };

module.exports = () => {
  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.countDocuments({}, (err, docs) => {
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.find(query).toArray((err, docs) => {
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.insertOne(item, (err, result) => {
          resolve(result);
          client.close();
        });
      });
    });
  };

  const aggregate = (collectionName, pipeline = []) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.aggregate(pipeline).toArray((err, docs) => {
          if (err) {
            console.log(" --- aggregate ERROR ---");
            console.log(err);
          }

          resolve(docs);
          client.close();
        });
      });
    });
  };

  return {
    count,
    get,
    add,
    aggregate,
  };
};

// async function getDocs(collectionName) {
//   const docs = await db.get(collectionName);
//   console.log(docs);
// }

// async function addDoc(collectionName, item) {
//   const result = await db.add(collectionName, item);
//   console.log(result.result);
// }

// addDoc('authors', { name: 'William Gibson' });
// addDoc('authors', { name: 'Neil Stephenson' });
// getDocs('authors');

// async function getBooks() {
//   const pipeline = [
//     {
//       $lookup: {
//         from: "authors",
//         localField: "author",
//         foreignField: "id",
//         as: "a",
//       },
//     },
//     {
//       $project: {
//         id: 1,
//         name: 1,
//         author: {
//           $arrayElemAt: ["$a", 0],
//         },
//       },
//     },
//   ];

//   const docs = await db.aggregate("books", pipeline);
//   console.log(JSON.stringify(docs, 0, 2));
// }

// async function getAuthors() {
//   const pipeline = [
//     {
//       $lookup: {
//         from: "books",
//         localField: "id",
//         foreignField: "author",
//         as: "books",
//       },
//     },
//   ];

//   const docs = await db.aggregate("authors", pipeline);
//   console.log(JSON.stringify(docs,0, 2));
// }

// async function getAuthors() {
//   const docs = await db.aggregate("authors");
//   console.log(JSON.stringify(docs, 0, 2));
// }
