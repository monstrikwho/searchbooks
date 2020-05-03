import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { resReadBook } from '../../scripts/readBooks';
import { ArrowLeftSVG, ArrowRightSVG } from '../../assets/svg'
import '../../../sass/read.sass';
import '../../../sass/pagination.sass';

class ReadPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bookMaxCountPages: 1
        }
    }
    
    componentDidMount() {
        this.setState({
            bookMaxCountPages: +this.props.bookMaxCountPages
        })
    }
    
    handlePageClick = (event) => {
        this.props.getResTextBook(null)
        resReadBook(this.props.bookUrl, this.props.getResTextBook, event.selected+1);
    }
    
    render() {
        return (
            <React.Fragment>
                {
                    (this.props.bookText !== null)
                    ?
                <Container>
                    <div dangerouslySetInnerHTML={{ __html: this.props.bookText }} id="booktext" />
                </Container>
                    :
                    <div className="spinner-box">
                        <Spinner animation="border" />
                    </div>
                }
                <Container id="pagination-box">
                    <ReactPaginate
                        previousLabel={<ArrowLeftSVG />}
                        nextLabel={<ArrowRightSVG />}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.bookMaxCountPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        pageClassName={'page-item'}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </Container>
            </React.Fragment>
        )
    }
}

export default ReadPage