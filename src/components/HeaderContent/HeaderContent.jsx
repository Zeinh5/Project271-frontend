import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import AdminHeader from '../AdminHeader/AdminHeader'
import './HeaderContent.css'
import { useLocation } from 'react-router-dom';

function HeaderContent() {

    let prevScrollpos = window.scrollY || window.pageYOffset;

    window.onscroll = function() {
      let currentScrollPos = window.scrollY || window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
      } else {
        document.getElementById("header").style.top = "-6.5rem";
      }
      prevScrollpos = currentScrollPos;
    }

    //
    
    // const userId = localStorage.getItem('userId');
    // if (!userId) {
    //   console.error("No email found, user isn't logged in");
    //   return;
    // }

    const location = useLocation(); 
    const isLandingPage = location.pathname === '/'; 
    const isAdmin = location.pathname === '/adminreport';  
    const isReports = location.pathname ==='/reports';    

    let HeaderContent;
    if (isLandingPage) {
        HeaderContent = (<NavBar/>);
    }
    else if (isAdmin || isReports) {
      HeaderContent = (<AdminHeader />);
    }
    else {
        HeaderContent = (<Header/>);
    }

  return HeaderContent;
}

export default HeaderContent