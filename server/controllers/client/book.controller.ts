import Book from "../../models/book.model";
import { Request, Response } from "express";

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
  const id = req.params.id;

  const book = await Book.findOne({
    _id: id,
    isPublished: false
  });

  res.json(book);
}