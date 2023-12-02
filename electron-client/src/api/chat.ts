import request from "@/utils/server";

export const addChat = (data: any) => {
    return request({
        url: "/addChat",
        method: "post",
        data
    });
};

export const saveChat = (data: any) => {
    return request({
        url: "/saveChat",
        method: "post",
        data
    });
};

export const getChat = (data: any) => {
    return request({
        url: "/getChat",
        method: "post",
        data
    });
};