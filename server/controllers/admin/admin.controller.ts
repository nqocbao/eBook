import { Request, Response } from "express";
import Admin from "../../models/admin.model";
import ForgotPassword from "../../models/forgot-password";
import md5 from "md5";

// import generateHelper from "../../helpers/generate.helper";

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

export const create = async (req: Request, res: Response) => {
    req.body.password = md5(req.body.password);
    const token = JWT.createJWT({ email: req.body.email });
    const admin = new Admin(req.body);
    await admin.save();
    res.json({
        code: 200,
        message: "Tạo tài khoản thành công"
    });
}


export const login = async (req: Request, res: Response) => {
    const email: String = req.body.email;
    const password: String = req.body.password;

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


export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({
        code: 200,
        message: "Đăng xuất thành công",

    });
};


export const forgotPassword = async (req: Request, res: Response) => {
    
};