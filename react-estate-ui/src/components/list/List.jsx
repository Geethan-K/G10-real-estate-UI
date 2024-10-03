import './list.scss'
import Card from"../card/Card"
import React from 'react'

const List = React.memo(({posts})=>{
  return (
    <div className='list'>
      {
          posts.length < 1 && <span className='no-post-container'>
           <h3>No Posts yet</h3>
        </span>
      }
      {posts && posts.length > 0 &&  posts.map(item=>(
        <Card key={item.id} item={item.post===undefined?item:item.post} ratings={item.ratings} comments={item.comments} postDetail={item.postDetail}  userDetail={item.user==undefined?item.post.user:item.user}/>
      ))}
    </div>
  )
})

export default List