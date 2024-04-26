import { Link } from 'react-router-dom'
// import head post data
import { HeadPost } from '../../data/data'

export default function Headpost() {
  return (
    <article className="head-post">
        {
            HeadPost.map(({id, Image, muserId, title, des}, index)=> {
                return (
                    <div key={index} className="container head-post-container">
                        
                        <div className="post-content">
                            <Link to={`posts/id`}>
                                <h1>{title}</h1>
                            </Link>
                            <p>{des}</p>
                        </div>
                        <div className="post-image">
                            <img src={Image} alt="" />
                        </div>
                    </div>
                )
            })
        }
    </article>
  )
}
