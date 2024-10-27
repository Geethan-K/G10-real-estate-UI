
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import BookingFilters from "../../components/booking-filters/bookingFilters";
import { Await, useLoaderData } from "react-router-dom";
import React,{useState,useEffect,Suspense} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPropertiesRequest } from "../../store/Property/propertySlice";
import { useSearchParams } from "react-router-dom";

const ListPage = React.memo(() => {
  const data = useLoaderData()
  const { queryParams } = useLoaderData();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [type,setType] = useState(searchParams.get('type') || "")
  
 const { list, loading, error } = useSelector((state) => state.property);
  useEffect(() => {
    // Dispatch the action to fetch properties
    if (queryParams) {
      dispatch(fetchPropertiesRequest(queryParams)); // Pass the query params if necessary
    }
  }, [dispatch, queryParams]);
   return <div className="listPage">
     {
       type == 'booking' &&  <div className="bookingFilterContainer">
       <BookingFilters />
     </div>
     }
    
     <div className="listContainer">
       <div className="wrapper">
         {
           !(type=='booking') && <Filter/>
         }
         
         <Suspense fallback={<p>Loading ...</p>}>
         <Await
           resolve={list}
           errorElement={<p>Error loading posts !</p>}
         >
           {/* {
             (postResponse)=> postResponse.data.map(post=>(
               <Card key={post.id} item={post} ratings={post.ratings} comments={post.comments} postDetail={post.postDetail} userDetail={post.user}/>
             ))
           } */}
           {
            list.map((post)=>(
              <Card key={post.id} item={post} ratings={post.ratings} comments={post.comments} postDetail={post.postDetail} userDetail={post.user}/>
            ))
          
           }
         </Await>
         </Suspense>
         {/* {posts.map(item=>(
           <Card key={item.id} item={item}/>
         ))} */}
       </div>
     </div>
     {/* <div className="mapContainer">
     <Suspense fallback={<p>Loading ...</p>}>
         <Await
           resolve={data.postResponse}
           errorElement={<p>Error loading posts !</p>}
         >
          {
           (postResponse) => <Map items={postResponse.data} />
          }
         </Await>
         </Suspense>
      
     </div> */}
   </div>;
 }) 


export default ListPage;
