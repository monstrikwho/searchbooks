import React from 'react';
import { Row } from 'react-bootstrap';
import '../../../sass/booksItem.sass';

class BooksItem extends React.Component {
    // constructor(props) {
    //     super(props)
        
    //     this.state = {
    //     }

    //     this.handleInputChange = this.handleInputChange.bind(this);
    // }


    cutDesc = desc => desc.slice(0, 800);
    

    render() {
        return (
            <React.Fragment>
                {this.props.books.map((item, i) => (
                    <Row key={i}>
                        <div className="book block-divided">
                            <div className="img-block">
                                <img src={item.img} alt={item.name}/>
                            </div>
                            <div className="desc">
                                <div className="name">
                                    <a href={item.url}>
                                        <span>{item.name}</span>
                                    </a>
                                </div>
                                <div className="author">
                                    <span>Автор: </span>{item.author}
                                </div>
                                <div className="genre">
                                    <span>Жанр: </span>{item.genre}
                                </div>
                                {/* <div className="pages">
                                    {item.pages}
                                </div> */}
                                <div className="years">
                                    <span>Год: </span>{item.years}
                                </div>
                                <div className="description">
                                    <span>Описание: </span>
                                    {
                                        (item.desc.length < 800)
                                        ?
                                        item.desc
                                        :
                                        this.cutDesc(item.desc)
                                    }
                                </div>
                            </div>
                        </div>
                    </Row>
                ))}
            </React.Fragment>
        )
    }
}

export default BooksItem