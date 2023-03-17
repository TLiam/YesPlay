import service from "@/request";

export function getSongList() {
    return service({
        url: "/personalized?limit=10"
    })
}

export function getPlayList(id) {
    return service({
        url: `/playlist/track/all?id=${id}&limit=10`
    })
}

export function getNewSongList() {
    return service({
        url: `/personalized/newsong`
    })
}