import React from 'react';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { response } from './scripts/handleSearch';
import { BackDoorSVG } from './assets/svg';
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
            this.props.renameNavbar('СТРАНИЦА ПОИСКА', 'search');
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
                        <Link to={(this.props.pageName === 'read') ? process.env.PUBLIC_URL + '/search' : process.env.PUBLIC_URL + '/'} 
                            onClick={() => {
                                this.props.renameNavbar('#НАЙДИКНИГУ', (this.props.pageName === 'read') ? 'search' : 'home')
                                if (this.props.pageName === 'read') {
                                    this.props.getResTextBook(null);
                                }
                            }}      
                        >
                            {
                                (this.props.pageName === 'home')
                                ?
                                ''
                                :
                                <BackDoorSVG />
                            }
                        </Link>
                        <Navbar.Brand>
                            {this.props.navBarTitle}
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
                            <Link to={process.env.PUBLIC_URL + '/search'}> 
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