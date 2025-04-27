import { Request, Response } from "express";
import Book from "../../models/book.model";
import News from "../../models/news.model";
import Category from "../../models/category.model";
import Favorite from "../../models/favorite.model";


// [GET] /favorites
export const index = async (req: Request, res: Response) => {
    const find = {
        user_id: req["user"]._id
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
    
    const favorites = await Favorite
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

    // Với mỗi favorite, tìm thêm document title dựa vào doc_id và doc_type
    const favoritesWithTitle = await Promise.all(favorites.map(async (fav) => {
        let documentTitle: any = {};

        if (fav.doc_type === "Book") {
            const doc = await Book.findById(fav.doc_id).select("_id title thumbnail");
            if (doc) documentTitle = doc;
        } else if (fav.doc_type === "News") {
            const doc = await News.findById(fav.doc_id).select("_id title thumbnail");
            if (doc) documentTitle = doc;
        }

        return {
            ...fav.toObject(),
            documentTitle
        };
    }));

    res.json(favoritesWithTitle);
}

// [POST] /favorite/add/:doc_id
export const addDoc = async (req: Request, res: Response) => {
    try {
        const existingFavorite = await Favorite.findOne({
            doc_id: req.params.doc_id
        });
        if (existingFavorite) {
            res.json({
                message: "Bạn đã thêm document này vào danh sách yêu thích!"
            });
            return;
        }
        let document1 = await Book.findById(req.params.doc_id);
        let document2 = await News.findById(req.params.doc_id);
        if (document1) {
            var favorite = new Favorite({
                user_id: req["user"]._id,
                doc_id: req.params.doc_id,
                doc_type: "Book"
            });
            await favorite.save();
        }
        else {
            if (document2) {
                var favorite = new Favorite({
                    user_id: req["user"]._id,
                    doc_id: req.params.doc_id,
                    doc_type: "News"
                });
                await favorite.save();
            }
            else {
                res.json({
                    message: "Document cần thêm vào danh sách yêu thích không tồn tại!"
                });
                return;
            }
        }
        res.json({
            message: "Thêm document yêu thích thành công!",
            favorite: favorite
        });
        return;
    } catch (error) {
        console.log(error);
        res.json({
            message: "Lỗi thêm document yêu thích",
            error: error
        });
    }
}

// [DELETE] /favorites/delete/:doc_id
export const deleteDoc = async (req: Request, res: Response) => {
    try {
        await Favorite.deleteOne({
            userId: req["user"]._id,
            doc_id: req.params.doc_id
        });
        res.json({
            message: "Xóa document yêu thích thành công!"
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Lỗi xóa document yêu thích",
            error: error
        });
    }
}