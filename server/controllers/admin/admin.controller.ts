import { Request, Response } from "express";
import Admin from "../../models/admin.model";
import md5 from "md5";

import * as JWT from "../../middlewares/JWT.middleware";

export const profile = async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findOne({
            token: req["tokenVerify"]
        }).select("-password -token");
    
        res.json({
            code: 200,
            message: "Thành công!",
            admin: admin
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không hợp lệ!"
        });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const existAdmin = await Admin.findOne({
            email: req.body.email
        });

        if(existAdmin) {
            res.json({
                code: 400,
                message: "Email đã tồn tại"
            });
            return;
        }

        const token = JWT.createJWT({ email: req.body.email })

        const dataAdminRegister = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
            token: token,
        };

        const admin = new Admin(dataAdminRegister);
        await admin.save();

        res.json({
            code: 200,
            message: "Đăng ký thành công!",
            token: token
        });

    } catch (error) {
        res.json({
            message: "Not Found"
        });
    }
}

export const login = async (req: Request, res: Response) => {
    const email: String = req.body.email;
    const password: String = req.body.email;

    const admin = await Admin.findOne({
        email: email,
        password: md5(password)
    });

    if(!admin) {
        res.json({
            code: 400,
            message: "Tài khoản không hợp lệ!"
        });
        return;
    }

    if(md5(password) != admin.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu"
        });
        return;
    }

    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: admin.token
    })
}