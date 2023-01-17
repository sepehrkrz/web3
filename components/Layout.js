import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Footer from './Footer';
export default props => {
    return (
        <Container>
            <Header />
            {props.children}
            {/*<h2> footer</h2>*/}
            <Footer />

        </Container>
    );
};