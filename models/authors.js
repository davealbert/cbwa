const db = require("../db")();
const COLLECTION = "authors";

module.exports = () => {
  const get = async (id = null) => {
    console.log("   inside authors model");
    if (!id) {
      const authors = await db.get(COLLECTION);
      return authors;
    }

    const authors = await db.get(COLLECTION, { id });
    return authors;
  };

  const add = async (name) => {
    const authorCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: authorCount + 1,
      name: name,
    });
    return results.result;
  };

  return {
    get,
    add,
  };
};
