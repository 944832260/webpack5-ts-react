import React, { Component } from 'react';
import './nopower.scss';

class Nopower extends Component {

    render() {
        return (
            <div id='Nopower'>
                <img src={require('@assets/icons/nopower.jpg')} alt=''/>
            </div>
        );
    }
}

export default Nopower;