import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { resReadBook } from "../../scripts/readBooks";
import "../../../sass/recSlider.sass";

class RecSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    };
  }

  componentDidMount() {
    if (window.innerWidth < 400) {
      this.setState({
        settings: {
          slidesToShow: 1,
        },
      });
    }
    if (window.innerWidth > 400 && window.innerWidth < 768) {
      this.setState({
        settings: {
          slidesToShow: 2,
        },
      });
    }
    if (window.innerWidth > 768 && window.innerWidth < 1024) {
      this.setState({
        settings: {
          slidesToShow: 3,
        },
      });
    }
  }

  render() {
    return (
      <Row className="block-divided">
        <div className="block-title">{this.props.itemData.genreName}</div>
        <Slider {...this.state.settings}>
          {this.props.itemData.items.map((item, i) => (
            <Link
              to={process.env.PUBLIC_URL + "/read"}
              onClick={() => {
                resReadBook(item.readLink, this.props.getResTextBook, 1);
                this.props.getBookUrl(item.readLink); // not readlink in json
                this.props.getBookMaxCountPages(item.pages);
                this.props.renameNavbar("Вернуться назад", "read");
              }}
              key={i}
            >
              <div className="recBook">
                <img src={item.img} alt={item.name} />
              </div>
            </Link>
          ))}
        </Slider>
      </Row>
    );
  }
}

export default RecSlider;
