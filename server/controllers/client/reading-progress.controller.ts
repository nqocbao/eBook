import { Request, Response } from "express";
import Book from "../../models/book.model";
import Category from "../../models/category.model";
import Favorite from "../../models/favorite.model";
import ReadingProgress from "../../models/reading-progress.model";

// [GET] /tasks
export const index = async (req: Request, res: Response) => {
    const find = {
        isPublished: false
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
    let limitItems: number = 10;
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

// [GET] /tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const book = await Book.findOne({
            _id: id,
            isPublished: false
        });

        const categoryOfBook = await Category.findOne({
            _id: book.category_id
        }).select("title type");

        if (!book) {
            res.json("Không tồn tại sách cần tìm!");
        }

        if (!categoryOfBook) {
            res.json("Không tồn tại thể loại sách");
        }

        res.json({
            book: book,
            categoryOfBook: categoryOfBook
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Lỗi tìm phim",
            error: error
        });
    }
}