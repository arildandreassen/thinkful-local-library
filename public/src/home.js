const sortByCount = (a, b) => {
  return b.count < a.count ? -1 : 1;
};

const getBorrowedCountByAuthor = (books) => {
  return books.reduce((borrowedCount, book) => {
    const { authorId, borrows } = book;
    const record = borrowedCount.find((record) => record.id === authorId);
    if (record) {
      record.count += borrows.length;
    } else {
      borrowedCount.push({
        id: authorId,
        count: borrows.length,
      });
    }
    return borrowedCount;
  }, []);
};

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    const { borrows } = book;
    const booksOut = borrows.reduce((booksOut, borrow) => {
      return (booksOut += borrow.returned === false ? 1 : 0);
    }, 0);
    return (total += booksOut);
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((genreCount, book) => {
    const { genre } = book;
    const found = genreCount.find((genres) => genres.name === genre);
    if (found) {
      found.count += 1;
    } else {
      genreCount.push({
        name: genre,
        count: 1,
      });
    }
    return genreCount;
  }, []);

  return genreCount.sort(sortByCount).slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookCount = books.reduce((bookCount, book) => {
    const { title, borrows } = book;
    bookCount.push({
      name: title,
      count: borrows.length,
    });
    return bookCount;
  }, []);

  return bookCount.sort(sortByCount).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const borrowedCountByAuthor = getBorrowedCountByAuthor(books);

  const authorCount = borrowedCountByAuthor.map((record) => {
    const author = authors.find((author) => author.id === record.id);
    const { first, last } = author.name;
    return {
      name: `${first} ${last}`,
      count: record.count,
    };
  });
  return authorCount.sort(sortByCount).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
