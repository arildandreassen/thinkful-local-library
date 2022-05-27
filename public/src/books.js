function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const partitioned = books.reduce(
    (partitioned, book) => {
      if (book.borrows[0].returned === false) {
        partitioned[0].push(book);
      } else {
        partitioned[1].push(book);
      }
      return partitioned;
    },
    [[], []]
  );
  return partitioned;
}

function getBorrowersForBook(book, accounts) {
  const lastTenBorrowers = book.borrows.slice(0, 10);
  return lastTenBorrowers.map((borrower) => {
    const account = accounts.find((account) => account.id === borrower.id);
    account.returned = borrower.returned;
    return account;
  });
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
