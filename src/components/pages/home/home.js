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
            factProgress: 0,
            step: 250,
            duration: 5750,
            endAfter: 0,
            statusTimer: 0, // 1 = satrt, 2 = paused, 3 = resume, 0 = null
            durationEndAfter: 5750
        }
    }

    componentDidMount() {
        this.changeFunc();

        this.timer = this.intervalTimer(this.changeFunc, this.state.duration);

        document.querySelector('.facts').addEventListener('mouseover', () => {
            this.timerPause();
        });
        document.querySelector('.facts').addEventListener('mouseleave', () => {
            this.timerResume();
        });
        document.querySelector('.facts').addEventListener('touchstart', () => {
            this.timerPause();
        });
        document.querySelector('.facts').addEventListener('touchend', () => {
            this.timerResume();
        });

    }

    componentWillUnmount() {
        clearInterval(this.interval); // Clear the interval right before component unmount
    }






    changeProgress = () => {
        this.interval2 = setInterval(() => {
            this.setState({
                factProgress: this.state.endAfter / 5000 * 100,
                endAfter: this.state.endAfter + 250
            })
        }, 250)
    }

    changeDurationEndAfter = () => {
        this.setState({ durationEndAfter: this.state.durationEndAfter - 250 })
    }



    changeFunc = () => {
        window.clearInterval(this.intervalDuration);
        clearInterval(this.interval2); 

        this.setState({
            fact: factsData[Math.floor(Math.random() * factsData.length)].text,
            durationEndAfter: 5750,
            factProgress: 0,
            step: 250,
            endAfter: 0
        })

        this.changeProgress()

        this.intervalDuration = window.setInterval(this.changeDurationEndAfter, 250)
    }


    
    // ####################### ACTIONS #######################
    intervalTimer = (callback, interval) => {
        this.timerId = window.setInterval(callback, interval);
        this.setState({ statusTimer: 1 })
    }

    timerPause = () => {
        window.clearTimeout(this.timeOut);
        clearInterval(this.interval2); 
        clearInterval(this.intervalDuration); 
        if (this.state.statusTimer !== 1) return;
        
        window.clearInterval(this.timerId);
        this.setState({ statusTimer: 2 })
        console.log(this.state.durationEndAfter);
        
    }

    timerResume = () => {
        if (this.state.statusTimer !== 2) return;
        
        this.changeProgress()
        this.intervalDuration = window.setInterval(this.changeDurationEndAfter, 250)
        this.setState({ statusTimer: 1 })
        
        console.log(this.state.durationEndAfter);
        this.timeOut = window.setTimeout(this.timerTimeoutCallback, this.state.durationEndAfter);
    }

    timerTimeoutCallback = () => {
        // if (this.state.statusTimer !== 1) return;

        this.changeFunc();

        this.timerId = window.setInterval(this.changeFunc, this.state.duration);
        this.setState({ statusTimer: 1 })
    };
    // ####################### END ACTIONS #######################


    render() {
        return (
            <React.Fragment>
                <Container>
                   <RecSlider itemData={recData[0]} />
                </Container>
                <FactsContainer>
                    {this.state.fact}
                    <ProgressBar now={this.state.factProgress} /> 
                </FactsContainer>
                <Container>
                   <RecSlider itemData={recData[1]} />
                </Container>
            </React.Fragment>
        )
    }
}

export default HomePage