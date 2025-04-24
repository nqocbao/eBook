import { Request, Response } from "express";
import Category from "../../models/category.model";

//[GET] categories/index
export const index = async (req: Request, res: Response) => {
    const find = {
        delete: false
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
    
    const categories = await Category
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

    res.json(categories);
}

//[GET] categories/detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
            const id = req.params.id;
    
            const category = await Category.findOne({
                _id: id,
                deleted: false
            });
    
            res.json({
                category: category
            });
        } catch (error) {
            console.log(error);
            res.json({
                message: "Lỗi tìm loại",
                error: error
            });
        }
}

//[PATCH] categories/create
export const create = async (req: Request, res: Response) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        
        res.json({
            message: "Tạo phân loại mới thành công",
            newCategory: newCategory
        });
    } catch(error) {
        res.json({
            message: "Tạo phân loại không thành công",
        });
    }
}
//[PATCH] categories/edit
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const data = req.body;
        await Category.updateOne({
            _id: id
        } ,data);
        res.json({
            message: "Cập nhật phân loại thành công!"
        });
    } catch(error) {
        res.json({
            message: "Không tìm thấy phân loại!"
        });
    }
}

//[PATCH] categories/deleteCategories
export const deleteCategories = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        
        await Category.updateMany({
            _id: { $in: ids }
        }, {
            deleted: true
        })
        
        res.json({
            message: "Xóa phân loại thành công"
        });
  
    } catch(error) {
        res.json({
            message: "Không tìm thấy phân loại"
        });
    }
}