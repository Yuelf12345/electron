import request from "@/utils/server";

export const Login = (data: any) => {
    return request({
        url: "/login",
        method: "post",
        data
    });
};

export const Register = (data: any) => {
    return request({
        url: "/register",
        method: "post",
        data
    });
};

