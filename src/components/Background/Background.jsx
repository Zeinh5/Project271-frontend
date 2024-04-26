import './Background.css'

import vid from '../../assets/videopaint.mp4'
import pic1 from '../../assets/painting.jpg'
import pic2 from '../../assets/write.jpg'
import pic3 from '../../assets/photograph.jpg'

const Background = ({playStatus,heroCount}) => {
    if (playStatus) {
        return (
            <video className='background fade-in' autoPlay loop muted playsInline> 
                <source src={vid} type='video/mp4' />
            </video>
        )
    }
    else if (heroCount===0) {
        return <img src={pic1} className='background fade-in' alt="" />
    }
    else if (heroCount===1) {
        return <img src={pic2} className='background fade-in' alt="" />
    }    
    else if (heroCount===2) {
        return <img src={pic3} className='background fade-in' alt="" />
    }

}
 
export default Background;
