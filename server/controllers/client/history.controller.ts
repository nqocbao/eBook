import { Request, Response } from "express";
import Book from "../../models/book.model";
import History from "../../models/history.model";

// [GET] /history
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
    
    const histories = await History.find(find).sort({ lastReadAt: -1 });

    // Với mỗi favorite, tìm thêm document title dựa vào doc_id và doc_type
    const historiesWithTitle = await Promise.all(histories.map(async (his) => {
        let documentTitle: any = {};

        const doc = await Book.findById(his.book_id).select("_id title thumbnail");
        if (doc) documentTitle = doc;

        return {
            ...his.toObject(),
            documentTitle
        };
    }));

    res.status(200).json(historiesWithTitle);
}

// [PUT] /history/add/:book_id
export const addBook = async (req: Request, res: Response) => {
    try {
        const user_id = req["user"]._id;
        const book_id = req.params.book_id;
    
        const existed = await History.findOne(
          { user_id, book_id }
        );

        if (!existed) {
            const newItem = await History.create({
                user_id,
                book_id,
                lastReadAt: Date.now()
            });

            if (!newItem) {
                res.status(500).json({ error: 'Lỗi khi tạo mới lịch sử đọc' });
                return;
            }

            res.status(200).json({
                message: "Tạo mới lịch sử đọc thành công",
                newItem: newItem
            });
            return;
        }

        const updated = await History.findOneAndUpdate(
            { user_id, book_id },
            { lastReadAt: Date.now() }
        );
        if (!updated) {
            res.status(500).json({ error: 'Lỗi khi cập nhật lịch sử đọc' });
            return;
        }
        res.status(200).json({
            message: "Cập nhật lịch sử đọc thành công",
            updated: updated
        });
        
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Lỗi khi cập nhật lịch sử đọc' });
      }
}

// [DELETE] /history/delete/:doc_id
export const deleteBook = async (req: Request, res: Response) => {
    try {
        await History.deleteOne({
            user_id: req["user"]._id,
            book_id: req.params.book_id
        });
        res.status(200).json({
            message: "Xóa lịch sử đọc thành công!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Lỗi xóa lịch sử đọc",
            error: error
        });
    }
}