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
        }
    }


    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <div className='col-md-6'>
                        <Form inline onSubmit={this.handleButtonClick}>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleInputChange} value={this.state.inputValue.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, ' ').split('  ').join(' ')} />
                            <Link to='/search'> 
                                <Button variant="outline-info" type="submit" onClick={() => {this.handleButtonClick()}}>Search</Button>
                            </Link>
                        </Form>
                    </div>
                </Container>
            </Navbar>
        )
    }
}

export default Navs