import Book from "../model/book.model.js";

const addBook = async (req, res) => {
    try {
        const { title, author, publishedDate, price } = req.body;

        if (!title || !author || !publishedDate || !price) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const book = await Book.create({
            title,
            author,
            publishedDate,
            price,
        });

        return res.status(201).json({
            message: "Book added successfully",
            book,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const editBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishedDate, price } = req.body;

        const book = await Book.findByIdAndUpdate(
            id,
            {
                title,
                author,
                publishedDate,
                price,
            },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        return res.status(200).json({
            message: "Book updated successfully",
            book,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        return res.status(200).json({
            books,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export {
    addBook,
    editBook,
    deleteBook,
    getAllBooks,
};
