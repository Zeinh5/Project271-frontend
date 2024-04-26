import './ProfileHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { PiEnvelopeThin } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

// import react icons................
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function ProfileHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken'); 
        localStorage.removeItem('userId');
        navigate('/');
    };

  return (
    <nav id="header">
        <div className="container nav-container">
            <Link className="nav-logo" to={'/home'}>MUSE</Link>

            <ul className="nav-menu">
                <li className="icon"><Link to={'/chats'}><PiEnvelopeThin /></Link></li>
                <li className="icon"><Link to={'/create'}><CiCirclePlus /></Link></li>
                <li onClick={handleLogout} className="icon"><IoLogOutOutline /></li>
            </ul>

            <button className="nav-toggle-button">
            <FaBars />
            <AiOutlineClose />
            </button>
        </div>
    </nav>
  )
}