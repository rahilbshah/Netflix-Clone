import { ArrowBackOutlined } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import './Watch.scss'

const Watch = () => {
  const location = useLocation();
  return (
    <div className="watch">
          <Link to='/' className='link' >
        <div className="back">
            <ArrowBackOutlined/>
            Home
        </div>
          </Link>
        <video src={location.state.video}  autoPlay progress controls className='video' />
    </div>
  )
}

export default Watch