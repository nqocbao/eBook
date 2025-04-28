import { Request, Response } from "express";
import News from "../../models/news.model";
import Category from "../../models/category.model";

//[GET] /news/index
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
    
    const news = await News
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

    res.json(news);
}

//[GET] /detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
            const id = req.params.id;
    
            const news = await News.findOne({
                _id: id,
                isPublished: true
            });
    
            const categoryOfNew = await Category.findOne({
                _id: news.category_id
            }).select("title type");
    
            if (!news) {
                res.json("Không tồn tại báo cần tìm!");
            }
    
            if (!categoryOfNew) {
                res.json("Không tồn tại thể loại báo");
            }
    
            res.json({
                new: news,
                categoryOfNew: categoryOfNew
            });
        } catch (error) {
            console.log(error);
            res.json({
                message: "Lỗi tìm báo",
                error: error
            });
        }
}

//[PATCH] news/create
export const create = async (req: Request, res: Response) => {
    try {
        const newNew = new News(req.body);
        await newNew.save();
        
        res.json({
            message: "Tạo báo mới thành công",
            newNew: newNew
        });
    } catch(error) {
        res.json({
            message: "Tạo báo mới không thành công",
        });
    }
}
//[PATCH] news/edit
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const data = req.body;
        await News.updateOne({
            _id: id
        } ,data);
        res.json({
            message: "Cập nhật báo thành công!"
        });
    } catch(error) {
        res.json({
            message: "Không tìm thấy báo!"
        });
    }
}

//[PATCH] news/deleteNew
export const deleteNew = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        
        await News.updateMany({
            _id: { $in: ids }
        }, {
            isPublished: false
        })
        
        res.json({
            message: "Xóa báobáo thành công"
        });
  
    } catch(error) {
        res.json({
            message: "Không tìm thấy báo"
        });
    }
}