import request from "@/utils/server";

export const upDateChat = (data: any) => {
    return request({
        url: "/upDateChat",
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