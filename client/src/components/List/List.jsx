import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { useRef, useState } from 'react'
import ListItem from '../ListItem/ListItem'
import './List.scss'

const List = ({list}) => {
    const [slideNumber, setSlideNumber] = useState(0);
    const listRef= useRef();

    const handleClick=(direction)=>{
        let distance = listRef.current.getBoundingClientRect().x-50;
        if(direction==="left" && slideNumber>0 ){
            listRef.current.style.transform=`translateX(${230+distance}px)`
            setSlideNumber(slideNumber-1)
        }else if(direction==="right" && slideNumber<5){
            listRef.current.style.transform=`translateX(${-230+distance}px)`
            setSlideNumber(slideNumber+1)
        }
        console.log(slideNumber);
    }
    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined onClick={()=>handleClick("left")}  className="sliderArrow left"  style={{ display: slideNumber<=0 && "none" }}/>
                <div ref={listRef} className="container">
                    {list.content.map((item,i)=>(
                    <ListItem index={i} item={item} key={i}  />
                    ))}
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={()=>handleClick("right")}  style={{ display: slideNumber>=5 && "none" }} />
            </div>
        </div>
    )
}

export default List