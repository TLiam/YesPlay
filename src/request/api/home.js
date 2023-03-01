import service from "@/request";

export function getSongList() {
    return service({
        url: "/personalized?limit=10"
    })
}