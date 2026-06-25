<<<<<<< HEAD
import Book from '../model/book.model.js';
=======
import Book from '../models/book.model.js';
>>>>>>> 3abe013 (Add book model and controller with CRUD operations)

const addBook = async (req, res) => {
    const { title, author, publishedDate, price } = req.body;

    if (!title || !author || !publishedDate || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({
        title,
        author,
        publishedDate,
        price
    });

    if (!book) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(201).json({ message: "Book added successfully", book });
}


const editBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, publishedDate, price } = req.body;

    if (!title || !author || !publishedDate || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const result = await Book.update({
        title,
        author,
        publishedDate,
        price
    }, {
        where: {
            id
        }
    });

    if (!result) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ message: "Book updated successfully" });

}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    const result = await Book.delete({
        id
    });

    if (!result) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });

}

const getAllBooks = async (req, res) => {
    const books = await Book.findAll();

    if (!books) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ books });         

}

<<<<<<< HEAD

export  {
    addBook,
    editBook,
    deleteBook,
    getAllBooks
}
=======
>>>>>>> 3abe013 (Add book model and controller with CRUD operations)
