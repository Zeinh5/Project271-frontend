import './AdminHeader.css'
import { Link } from 'react-router-dom'

// import react icons................
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function Header() {
  return (
    <nav id="header">
        <div className="container nav-container">
            <Link className="nav-logo" to={'/home'}>MUSE</Link>

            <ul className="nav-menu">
                <li><Link to={'/profile/id'}>Username</Link></li>
                <li><Link to={'/create'}>Create Post</Link></li>
                {/* <li><Link to={'/muser'}>Musers</Link></li> */}
                {/* <li><Link to={'/logout'}>Logout</Link></li> */}
            </ul>

            <button className="nav-toggle-button">
            <FaBars />
            <AiOutlineClose />
            </button>
        </div>
    </nav>
  )
}