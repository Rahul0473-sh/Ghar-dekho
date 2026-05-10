import { defer } from "react-router-dom";
import { apiRequest } from "./apiRequest";
import { listData } from "./dummyData";

export const SinglePageLaoder = async ({ request, params }) => {
    try {
        const res = await apiRequest(`/post/getPost/${params.id}`);
        return res.data;
    } catch {
        const dummy = listData.find((item) => String(item.id) === String(params.id));
        if (dummy) return dummy;
        throw new Response("Not Found", { status: 404 });
    }
}

export const ListPageLaoder = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const rest = await apiRequest("/post/getPosts? " + query)
    console.log(rest);
    return rest.data;
};
export const profilePageLoader = async () => {
    const postPromise = apiRequest("/user/profilePost");
    const chatPromise=apiRequest("/chats")
    return defer({
        postResponse: postPromise,
        chatResponse:chatPromise,
    });
}