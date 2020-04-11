import React from 'react';
import { Container, Row,  Spinner } from 'react-bootstrap';
import BooksItem from './booksItem';
import '../../../sass/search.sass';

class SearchPage extends React.Component {
    render() {
        return (
            <Container>
                {
                    (this.props.booksStatus)
                    ?
                        (this.props.pageCount === this.props.pageCountMax && this.props.booksArr.length > 1)
                        ?
                        // проверяем доступность, показываем кол-во страниц
                        <BooksItem books={this.props.booksArr} />
                        :
                        <div className="loading">
                            <div className="message">
                                <div>
                                    <Spinner animation="grow" size="sm" />
                                    Идет анализ...
                                </div>
                                <div>{this.props.pageCount} - {this.props.pageCountMax}</div>
                            </div>
                        </div>
                    :
                        (this.props.booksStatus === null)
                        ?
                        // идет поиск
                        <div className="loading">
                            <Spinner animation="border" />
                            Идет поиск...
                        </div>
                        :
                        <Row>
                            Книг не найдено
                        </Row>
                }
            </Container>
        )
    }
}

export default SearchPage