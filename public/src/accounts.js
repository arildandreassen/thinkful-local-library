const getCurrentBooksByAccount = (books, account) => {
  return books.filter(
    (book) =>
      book.borrows[0].id === account.id && book.borrows[0].returned === false
  );
};

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => {
    return a.name.last < b.name.last ? -1 : 1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  const bookCount = books.reduce((bookCount, book) => {
    const { borrows } = book;
    const borrowCount = borrows.reduce((borrowCount, borrow) => {
      borrowCount += borrow.id === account.id ? 1 : 0;
      return borrowCount;
    }, 0);

    bookCount += borrowCount;
    return bookCount;
  }, 0);
  return bookCount;
}

function getBooksPossessedByAccount(account, books, authors) {
  const currentBooks = getCurrentBooksByAccount(books, account);
  return currentBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      ...book,
      author,
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
