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
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        }
    }

    componentDidMount() {
        if(window.innerWidth < 400) {
            this.setState({
                settings: {
                    slidesToShow: 1
                }
            })
        }
        if(window.innerWidth > 400 && window.innerWidth < 768) {
            this.setState({
                settings: {
                    slidesToShow: 2
                }
            })
        }
        if(window.innerWidth > 768 && window.innerWidth < 1024) {
            this.setState({
                settings: {
                    slidesToShow: 3
                }
            })
        }
    }

    render() {
        return (
            <Row className="block-divided">
                <div className="block-title">{this.props.itemData.genreName}</div>
               <Slider {...this.state.settings}>
                   {this.props.itemData.items.map((item, i) => (
                       <div className="recBook" key={i}>
                           <img src={item.img} alt={item.name} />
                           <div className="desc">
                                <div className="bookName">{item.name}</div>
                               <div className="d-flex">
                                    <div className="bookAuthor">{item.author}</div>
                                    {/* <div className="years">{item.years}</div> */}
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