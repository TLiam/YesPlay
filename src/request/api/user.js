import service from "@/request";

// 获取二维码的 unikey
export async function getQrKey() {
    return await service({
        url: `/login/qr/key?timestamp=${Date.now()}`,
    })
}

// 通过 unikey 获取 qrimg
export async function createQR(key) {
    return await service({
        url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`
    })
}

// 检测 二维码扫码状态
export async function checkStatus(key) {
    const res = await service({
        url: `/login/qr/check?key=${key}&timestamp=${Date.now()}`
    })

    console.log("checkStatus", res)

    return res.data
}

// 获取登录状态
export async function getLoginStatus(cookie = '') {
    const res = await service({
        method: "post",
        url: `/login/status?timestamp=${Date.now()}`,
        data: {
            cookie
        }
    })
}

// 获取用户账号信息
export async function getUserCount() {
    return await service({
        url: `/user/account`
    })
}

// 传入从 getUserCount 得到的 id，获取用户详情
export async function getUserDetail(uid) {
    return await service({
        url: `/user/detail?uid=${uid}`
    })
}
