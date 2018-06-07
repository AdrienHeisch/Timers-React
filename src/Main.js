import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/Time';

class Main {

    static interval;

    static init () {
        this.resume();
    }

    static render () {
        ReactDOM.render(
            <Timer />
        , document.getElementById('root'));
    }

    static resume () {
        this.interval = setInterval(this.render.bind(this), 500);
    }

    static pause () {
        clearInterval(this.interval);
        this.interval = undefined;
    }

}

Main.init();