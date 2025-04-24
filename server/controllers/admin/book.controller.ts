import { Request, Response } from "express";
import Book from "../../models/book.model";
import Category from "../../models/category.model";

//[GET] /books/index
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

//[GET] /detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
            const id = req.params.id;
    
            const book = await Book.findOne({
                _id: id,
                isPublished: true
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
                message: "Lỗi tìm sách",
                error: error
            });
        }
}

//[PATCH] books/create
export const create = async (req: Request, res: Response) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        
        res.json({
            message: "Tạo sách mới thành công",
            newBook: newBook
        });
    } catch(error) {
        res.json({
            message: "Tạo sách mới không thành công",
        });
    }
}
//[PATCH] books/edit
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const data = req.body;
        await Book.updateOne({
            _id: id
        } ,data);
        res.json({
            message: "Cập nhật sách thành công!"
        });
    } catch(error) {
        res.json({
            message: "Không tìm thấy sách!"
        });
    }
}

//[PATCH] books/deleteBook
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        
        await Book.updateMany({
            _id: { $in: ids }
        }, {
            isPublished: false
        })
        
        res.json({
            message: "Xóa sách thành công"
        });
  
    } catch(error) {
        res.json({
            message: "Không tìm thấy sách"
        });
    }
}