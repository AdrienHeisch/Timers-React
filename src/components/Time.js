import React from 'react';
import FormatDate from '../utils/FormatDate';

export default class Time extends React.Component {

    render () {
        return (
            <div>I'm a timer called { FormatDate.toString(new Date()) } !</div>
        );
    }

}