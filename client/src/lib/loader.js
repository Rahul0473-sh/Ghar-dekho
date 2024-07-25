import { defer } from "react-router-dom";
import { apiRequest } from "./apiRequest";

export const SinglePageLaoder=async({request,params})=>{
    const res = await apiRequest(`/post/getPost/${params.id}`);
    return res.data;
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