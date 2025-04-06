import News from "../../models/news.model";
import { Request, Response } from "express";
import Category from "../../models/category.model";


// [GET] /news
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
    
    const news = await News
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

    res.json(news);
}

// [GET] /news/detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const news = await News.findOne({
            _id: id,
            isPublished: false
        });

        const categoryOfNews = await Category.findOne({
            _id: news.category_id
        }).select("title type");

        if (!news) {
            res.json("Không tồn tại báo cần tìm!");
        }

        if (!categoryOfNews) {
            res.json("Không tồn tại thể loại báo");
        }

        res.json({
            news: news,
            categoryOfNews: categoryOfNews
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Lỗi tìm báo",
            error: error
        });
    }
}