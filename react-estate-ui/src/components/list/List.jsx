import './list.scss'
import Card from"../card/Card"

function List({posts}){
  console.log('posts',posts)
  
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item.id} item={item.post===undefined?item:item.post} ratings={item.ratings} />
      ))}
    </div>
  )
}

export default List