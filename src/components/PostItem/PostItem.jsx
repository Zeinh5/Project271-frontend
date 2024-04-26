import './PostItem.css';
import { Link } from 'react-router-dom';
import PostAuthor from '../PostAuthor/PostAuthor';

export default function PostItem({ postID, Image, tags, muserID, title, des, profileID, authorName, profilePicture }) {
    const shortTitle = title.length > 40 ? title.substr(0, 30) + '...' : title;
    // const shortDes = des.length > 145 ? des.substr(0, 145) + '...' : des;
    const src = `data:image/jpg;base64,${Image}`;



    return (
        <Link className="post" to = {`/muser/${muserID}`}>
            <div className="post-image">
                <img src={src} alt={title} />
            </div>
            <div className="post-content">
                <Link to={`posts/${postID}`}>
                    <h3>{shortTitle}</h3>
                </Link>
                <p>{des}</p>
                <div className="post-footer">
                    <div>
                  
                    </div>
                    <div className="post-tags">
                        {tags && tags.length > 0 && tags.map((tag, index) => (
                            <span key={index} className="tag">{typeof tag === 'string' ? tag : tag.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
