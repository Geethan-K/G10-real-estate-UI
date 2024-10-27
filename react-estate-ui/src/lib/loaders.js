import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"
import { useDispatch,useSelector } from "react-redux";
import { fetchPropertiesRequest, fetchPropertyDetailRequest } from "../store/Property/propertySlice";

export const singlePageLoader = async ({request,params}) =>{
    // const dispatch = useDispatch();
    // const { list, loading, error } = useSelector((state) => state.property);
    // console.log(list)
    // useEffect(() => {
    //     dispatch(fetchPropertyDetailRequest());
    //   }, [dispatch]);
    const postPromise = await apiRequest.get("/posts/"+params.id) 
  // //above code will be Replaced by redux store call
  //  const chatPromise = await apiRequest.get("/chats/",{userId:params.id})
    return defer({
     // postId:params.id
        postResponse:postPromise.data,
 //       chatResponse:chatPromise.data
    })
}
export const listPageLoader = async ({request,params}) => {
   // const query = request.url.split('?')[1]
   const url = new URL(request.url);
   const query = url.search;
   
   // const postPromise  = await apiRequest.get("/posts?"+query);
      return defer({
        queryParams:query
      })
    // return defer ({
    //     postResponse:postPromise
    // })
}

export const profilePageLoader = async () => {
    const postPromise = await apiRequest.get('/users/profilePosts')
    const chatPromise = apiRequest.get('/chats')
    return defer({
        postResponse:postPromise,
        chatResponse:chatPromise
    })
}
