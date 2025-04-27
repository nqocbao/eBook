import { Request, Response } from "express";
import Book from "../../models/book.model";
import ReadingProgress from "../../models/reading-progress.model";
import User from "../../models/user.model";

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

export const detail = async (req: Request, res: Response) => {
    
}


export const deleteReadingProgress = async (req: Request, res: Response) => {

    try {
        const id = req.params.id;
        const result = await ReadingProgress.findByIdAndDelete(id);
        res.json({
            code:200,
            message: "Xóa tiến trình đọc thành công!"
        })
    } catch(error) {
        res.json({
            code:400,
            message: "Xóa tiến trình đọc không thành công"
        })
    }
};

