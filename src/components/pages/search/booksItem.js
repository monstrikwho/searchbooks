import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { resReadBook } from "../../scripts/readBooks";
import "../../../sass/booksItem.sass";

class BooksItem extends React.Component {
  cutDesc = (desc) => desc.slice(0, 600);

  render() {
    return (
      <React.Fragment>
        {this.props.books.map((item, i) => (
          <Row key={i}>
            <div className="book block-divided">
              <div className="img-block">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="desc">
                <Link
                  to={process.env.PUBLIC_URL + "/read"}
                  onClick={() => {
                    resReadBook(item.readLink, this.props.getResTextBook, 1);
                    this.props.getBookUrl(item.readLink);
                    this.props.getBookMaxCountPages(item.pages);
                    this.props.renameNavbar("Вернуться назад", "read");
                  }}
                >
                  <div className="name">
                    <span>{item.name}</span>
                  </div>
                </Link>
                <div className="author">
                  <span>Автор: </span>
                  {item.author}
                </div>
                <div className="genre">
                  <span>Жанр: </span>
                  {item.genre}
                </div>
                {/* <div className="pages">
                                    {item.pages}
                                </div> */}
                <div className="years">
                  <span>Год: </span>
                  {item.years}
                </div>
                <div className="description">
                  <span>Описание: </span>
                  {item.desc.length < 600
                    ? item.desc
                    : `${this.cutDesc(item.desc)} ...`}
                </div>
              </div>
            </div>
          </Row>
        ))}
      </React.Fragment>
    );
  }
}

export default BooksItem;
