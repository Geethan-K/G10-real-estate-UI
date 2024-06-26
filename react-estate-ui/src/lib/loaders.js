import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request,params}) =>{
    const postPromise = await apiRequest.get("/posts/"+params.id)
    const chatPromise = await apiRequest.get("/chats")
    console.log('from single page loader chatResponse',chatPromise)
    return defer({
        postResponse:postPromise.data,
        chatResponse:chatPromise.data
    })
}
export const listPageLoader = async ({request,params}) => {
    const query = request.url.split('?')[1]
    const postPromise  = await apiRequest.get("/posts?"+query);
    return defer ({
        postResponse:postPromise
    })
}

export const profilePageLoader = async () => {
    const postPromise = apiRequest.get('/users/profilePosts')
    const chatPromise = apiRequest.get('/chats')
    console.log('from profile loader chatResponse',chatPromise)
    return defer({
        postResponse:postPromise,
        chatResponse:chatPromise
    })
}
