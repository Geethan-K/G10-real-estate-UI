
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import BookingFilters from "../../components/booking-filters/bookingFilters";
import { Await, useLoaderData } from "react-router-dom";
import React,{useState} from "react";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

const ListPage = React.memo(()=> {
  const data = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams();
  const [type,setType] = useState(searchParams.get('type') || "")
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
           resolve={data.postResponse}
           errorElement={<p>Error loading posts !</p>}
         >
           {
             (postResponse)=> postResponse.data.map(post=>(
               <Card key={post.id} item={post} ratings={post.ratings} comments={post.comments}/>
             ))
           }
         </Await>
         </Suspense>
         {/* {posts.map(item=>(
           <Card key={item.id} item={item}/>
         ))} */}
       </div>
     </div>
     <div className="mapContainer">
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
      
     </div>
   </div>;
 }) 


export default ListPage;
