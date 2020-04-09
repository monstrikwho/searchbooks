import React from 'react';
import { Row } from 'react-bootstrap';

class BooksItem extends React.Component {
    // constructor(props) {
    //     super(props)
        
    //     this.state = {
    //     }

    //     this.handleInputChange = this.handleInputChange.bind(this);
    // }

    

    render() {
        return (
            <React.Fragment>
                {this.props.books.map((item, i) => (
                    <Row key={i}>
                        <div className="book">
                            <div className="img-block">
                                <img src={item.img} alt={item.name}/>
                            </div>
                            <div className="desc">
                                <div className="name">
                                    {item.name}
                                </div>
                                <div className="author">
                                    {item.author}
                                </div>
                                <div className="genre">
                                    {item.genre}
                                </div>
                                <div className="genre">
                                    {item.pages}
                                </div>
                                <div className="genre">
                                    {item.years}
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