import React from 'react';
import { Row } from 'react-bootstrap';
import '../../../sass/recSlider.sass';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class RecSlider extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            settings: {
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    }

    render() {
        return (
            <Row>
                <div>{this.props.itemData.genreName}</div>
               <Slider {...this.state.settings}>
                   {this.props.itemData.items.map((item, i) => (
                       <div className="recBook" key={i}>
                           <img src={item.img} alt={item.name} />
                           <div className="desc">
                                <div className="bookName">{item.name}</div>
                               <div className="d-flex">
                                    <div className="bookAuthor">{item.author}</div>
                                    <div className="years">{item.years}</div>
                               </div>
                           </div>
                       </div>
                   ))}
                </Slider>
            </Row>
        )
    }
}

export default RecSlider