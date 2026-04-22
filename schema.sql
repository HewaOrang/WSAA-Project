-- Create the book table
CREATE TABLE book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL
);

-- Insert sample data (prices in euro cents)
INSERT INTO book (title, author, price) VALUES ('The Hobbit', 'J.R.R. Tolkien', 1299);
INSERT INTO book (title, author, price) VALUES ('To Kill a Mockingbird', 'Harper Lee', 1499);
INSERT INTO book (title, author, price) VALUES ('1984', 'George Orwell', 1199);
INSERT INTO book (title, author, price) VALUES ('Pride and Prejudice', 'Jane Austen', 899);
INSERT INTO book (title, author, price) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 1099);
