// UseState
import { useState } from 'react'
// Post items
import PostItem from '../components/PostItem/PostItem'

export default function MuserPosts() {
  const [posts, setPosts] = useState('')
  return (
    <section className="muserPosts">
      <h1 className="page-title">Muser Posts</h1>
      { posts.length > 0 ? <div className="container muserPosts-container">
            {
              posts.map(({id,Image, muserID, category, title, des}, index)=> <PostItem key={index} Image={Image} category={category} muserID={muserID} title={title} des={des} postID={id} />)
            }
          </div> : <h2 className="error-center">No posts found</h2> }
    </section>
    )
}
