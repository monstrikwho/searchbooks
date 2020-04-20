import React from 'react';
import { Container } from 'react-bootstrap';
import RecSlider from './recSlider';
import FactsContainer from './factsContainer';
import recData from './recomended.json';
import factsData from './booksFacts.json';

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fact: null
        }
    }

    componentDidMount() {
        this.setState({
            fact: factsData[Math.floor(Math.random() * factsData.length)].text
        })
        setInterval(() => {
            this.setState({
                fact: factsData[Math.floor(Math.random() * factsData.length)].text
            })
        }, 5000)
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    {recData.map((item, i) => <RecSlider key={i} itemData={item} />)}
                </Container>
                <FactsContainer>
                    {this.state.fact}
                </FactsContainer>
            </React.Fragment>
        )
    }
}

export default HomePage