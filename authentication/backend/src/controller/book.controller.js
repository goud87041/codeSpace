import Book from "../model/book.model.js";

const addBook = async (req, res) => {
    try {
        const { title, author, publishedDate, price, description } = req.body;

        if (!title || !author || price === undefined || price === null || price === "") {
            return res.status(400).json({
                message: "Title, author, and price are required",
            });
        }

        const parsedPrice = Number(price);
        if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
            return res.status(400).json({
                message: "Price must be a valid non-negative number",
            });
        }

        const book = await Book.create({
            title,
            author,
            publishedDate,
            price: parsedPrice,
            description: description || ""
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

const getBook = async (req, res) => {
    try {
        const { BookId } = req.params;

        const book = await Book.findById(BookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ book });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const editBook = async (req, res) => {
    try {
        const { BookId } = req.params;
        const { title, author, publishedDate, price, description } = req.body;

        const update = {
            title,
            author,
            publishedDate,
            description: description || ""
        };

        if (price !== undefined && price !== null && price !== "") {
            const parsedPrice = Number(price);
            if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
                return res.status(400).json({ message: "Price must be a valid non-negative number" });
            }
            update.price = parsedPrice;
        }

        const book = await Book.findByIdAndUpdate(
            BookId,
            update,
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
        const { BookId } = req.params;

        const book = await Book.findByIdAndDelete(BookId);

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

const assignBook = async (req, res) => {
    try {
        const { BookId } = req.params;
        const userId = req.user?.id;

        if (!BookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findById(BookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.assign) {
            if (book.user?.toString() === userId) {
                book.assign = false;
                book.user = null;
                await book.save();
                return res.status(200).json({ message: "Book unassigned successfully", book });
            }
            return res.status(403).json({ message: "Book is already assigned to another user" });
        }

        book.assign = true;
        book.user = userId;
        await book.save();

        return res.status(200).json({ message: "Book assigned successfully", book });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
    getBook,
    editBook,
    deleteBook,
    assignBook,
    getAllBooks,
};
