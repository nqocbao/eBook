import { Request, Response } from "express";
import Book from "../../models/book.model";
import Category from "../../models/category.model";

// [GET] /categories/:category_id
export const index = async (req: Request, res: Response) => {
    const categoryId = req.params.category_id;

    try {
        const bookWithCategory = await Book.find({
            category_id: categoryId
        });
        res.status(200).json(bookWithCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}