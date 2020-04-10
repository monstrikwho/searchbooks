import React from 'react';
import { response } from './scripts/handleSearch';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../sass/navs.sass'

class Navs extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            inputValue: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }


    handleButtonClick = () => {
        var inputValue = this.state.inputValue.replace(/^\s+/g, '').replace(/\s+$/g, ''); // удаляем пробелы сначала и в конце
        if(inputValue.length < 3) {
            console.log('lose');
        } else {
            response(inputValue, this.props.getData, this.props.getRequestPages) // выполняем запрос
            this.setState({
                inputValue: ''
            })
        }
    }


    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <div className="navbar-action">
                        <Link to="/" 
                            onClick={() => {
                                this.props.renameNavbar('#НАЙДИКНИГУ')
                            }}      
                        >
                            {
                                (this.props.pageName === '#НАЙДИКНИГУ')
                                ?
                                ''
                                :
                                <svg className="bi bi-box-arrow-in-left" width="1.75rem" height="1.75rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.854 11.354a.5.5 0 000-.708L5.207 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clipRule="evenodd"/>
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 00-.5-.5h-9a.5.5 0 000 1h9A.5.5 0 0015 8z" clipRule="evenodd"/>
                                    <path fillRule="evenodd" d="M2.5 14.5A1.5 1.5 0 011 13V3a1.5 1.5 0 011.5-1.5h8A1.5 1.5 0 0112 3v1.5a.5.5 0 01-1 0V3a.5.5 0 00-.5-.5h-8A.5.5 0 002 3v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V13a1.5 1.5 0 01-1.5 1.5h-8z" clipRule="evenodd"/>
                                </svg>
                            }
                        </Link>
                        <Navbar.Brand>
                            {this.props.pageName}
                        </Navbar.Brand>
                    </div>
                    <div className='col-md-6'>
                        <Form inline onSubmit={this.handleButtonClick}>
                            <FormControl 
                                type="text" 
                                placeholder="Search" 
                                className="mr-sm-2" 
                                onChange={this.handleInputChange} 
                                value={this.state.inputValue.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, ' ').split('  ').join(' ')}
                            />
                            <Link to='/search'> 
                                <Button 
                                    type="submit" 
                                    variant="outline-info" 
                                    onClick={() => {
                                        this.handleButtonClick()
                                    }}
                                >
                                    Search
                                </Button>
                            </Link>
                        </Form>
                    </div>
                </Container>
            </Navbar>
        )
    }
}

export default Navs