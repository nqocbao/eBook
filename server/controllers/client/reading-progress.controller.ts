import { Request, Response } from "express";
import Book from "../../models/book.model";
import News from "../../models/news.model";
import Category from "../../models/category.model";
import Favorite from "../../models/favorite.model";
import ReadingProgress from "../../models/reading-progress.model";

// [GET] /reading-progress
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
    
    const readingProgress = await ReadingProgress
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

    // Với mỗi reading-progress, tìm thêm document title dựa vào doc_id và doc_type
    const readingProgressWithTitle = await Promise.all(readingProgress.map(async (progress) => {
        let documentTitle: any = {};

        if (progress.doc_type === "Book") {
            const doc = await Book.findById(progress.doc_id).select("_id title thumbnail");
            if (doc) documentTitle = doc;
        } else if (progress.doc_type === "News") {
            const doc = await News.findById(progress.doc_id).select("_id title thumbnail");
            if (doc) documentTitle = doc;
        }

        return {
            ...progress.toObject(),
            documentTitle
        };
    }));

    res.json(readingProgressWithTitle);
}

// [GET] /reading-progress/detail/:doc_id
export const detail = async (req: Request, res: Response) => {
    try {
        const progress = await ReadingProgress.findOne({
            user_id: req["user"]._id,
            doc_id: req.params.doc_id
        });
          
        if (!progress) {
            res.status(404).json({
                message: 'Chưa có tiến độ đọc cho docs này'
            });
            return;
        }
        
        res.status(200).json({
            message: "Trả về tiến trình đang đọc thành công",
            progress: progress
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// [POST] /reading-progress/add/:doc_id
export const addDoc = async (req: Request, res: Response) => {
    try {
        const doc_id = req.params.doc_id;
        const { currentPage } = req.body;
        let doc_type = "";

        let document1 = await Book.findById(req.params.doc_id);
        let document2 = await News.findById(req.params.doc_id);

        if (document1) doc_type = "Book";
        if (document2) doc_type = "News";
        if (doc_type == "") {
            res.json({
                success: false,
                message: "Document cần thêm vào danh sách đang đọc không tồn tại!"
            });
            return;
        }
        
        // Tìm và cập nhật tiến độ, hoặc tạo mới nếu chưa có
        const progress = await ReadingProgress.findOneAndUpdate(
            {
                user_id: req["user"]._id,
                doc_id
            },
            { 
                doc_type,
                currentPage,
                lastReadAt: Date.now()
            },
            { new: true, upsert: true }
        );
        
        res.status(200).json({ success: true, progress });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// [DELETE] /reading-progress/delete/:doc_id
export const deleteDoc = async (req: Request, res: Response) => {
    try {
        await ReadingProgress.deleteOne({
            user_id: req["user"]._id,
            doc_id: req.params.doc_id
        });
        res.json({
            message: "Xóa document đang đọc thành công!"
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Lỗi xóa document đang đọc",
            error: error
        });
    }
}