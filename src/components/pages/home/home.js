import React from 'react';
import { Container } from 'react-bootstrap';
import RecSlider from './recSlider';
import recData from './recomended.json';

class HomePage extends React.Component {
    render() {
        return (
            <Container>
                {recData.map((item, i) => <RecSlider key={i} itemData={item} />)}
            </Container>
        )
    }
}

export default HomePage