const db = require('../db')();

module.exports = () => {
  const get = (id = null) => {
    console.log('   inside books model');
    if (!id) {
      return db.books;
    }

    if (parseInt(id) > db.books.length) {
      return { error: "index out of range" };
    }
    return db.books[parseInt(id) - 1];
  }

  const add = (name, author) => {
    return db.books.push({
      id: db.books.length + 1,
      name: name,
      author: author
    });
  }

  return {
    get,
    add
  }
};