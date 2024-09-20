import './list.scss'
import Card from"../card/Card"
import React from 'react'

const List = React.memo(({posts})=>{
  console.log('posts',posts)
  
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item.id} item={item.post===undefined?item:item.post} ratings={item.ratings} comments={item.comments} postDetail={item.postDetail}  userDetail={item.user}/>
      ))}
    </div>
  )
})

export default List