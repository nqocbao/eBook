import Book from "../../models/book.model";
import { Request, Response } from "express";
import Category from "../../models/category.model";

// [GET] /books
export const index = async (req: Request, res: Response) => {
    const find = {
        isPublished: true
    };

    // Tìm kiếm
    if(req.query.keyword){
        const regex = new RegExp(`${req.query.keyword}`, "i");
        find["title"] = regex;
    }
    // Hết Tìm kiếm

    // Sắp xếp theo tiêu chí
    const sort = {};

    const sortKey = `${req.query.sortKey}`;
    const sortValue = req.query.sortValue;

    if(sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    // Hết Sắp xếp theo tiêu chí

    // Phân trang
    let limitItems: number = 1000;
    if(req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    }

    let page: number = 1;
    if(req.query.page) {
        page = parseInt(`${req.query.page}`);
    }

    const skip: number = (page - 1) * limitItems;
    // Hết phân trang
    
    const books = await Book
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

    res.json(books);
}

// [GET] /books/detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const book = await Book.findOne({
            _id: id,
            isPublished: true
        });

        if (!book) {
            res.status(404).json("Không tồn tại sách cần tìm!");
            return;
        }

        const categoryIds = book.category_id || [];
        const categoryWithTitle = await Category.find({
            _id: { $in: categoryIds }
        }).select("_id title description");

        if (categoryWithTitle.length === 0) {
            res.status(404).json("Không tồn tại thể loại sách");
            return;
        }

        res.json({
            book: book,
            categoryOfBook: categoryWithTitle
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Lỗi tìm sách",
            error: error
        });
    }
}