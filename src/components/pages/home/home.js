import React from 'react';
import { Container, ProgressBar } from 'react-bootstrap';
import '../../../sass/home.sass'
import RecSlider from './recSlider';
import FactsContainer from './factsContainer';
import recData from './recomended.json';
import factsData from './booksFacts.json';

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fact: null,
            duration: 5750,
            factTimer: 0,
            step: 250,
            endAfter: 0
        }
    }

    componentDidMount() {
        this.changeFacts();

        this.interval = setInterval(this.changeFacts, this.state.duration);
    }

    componentWillUnmount() {
        clearInterval(this.interval); // Clear the interval right before component unmount
    }

    changeFacts = () => {
        clearInterval(this.interval2); // Clear the interval right before component unmount

        this.setState({
            fact: factsData[Math.floor(Math.random() * factsData.length)].text,
            factTimer: 0,
            step: 250,
            endAfter: 0
        })

        this.changeProgress()
    }

    changeProgress = () => {
        this.interval2 = setInterval(() => {
            this.setState({
                factTimer: this.state.endAfter / 5000 * 100,
                endAfter: this.state.endAfter + 250
            })
        }, 250)
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                   <RecSlider itemData={recData[0]} />
                </Container>
                <FactsContainer>
                    {this.state.fact}
                    <ProgressBar now={this.state.factTimer} /> 
                </FactsContainer>
                <Container>
                   <RecSlider itemData={recData[1]} />
                </Container>
            </React.Fragment>
        )
    }
}

export default HomePage