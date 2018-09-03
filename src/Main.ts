import './stylesheets/Main.css'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import Timer from './components/time/Timer';

export default abstract class Main {

    private static readonly timeStep:number = 100;

    private static interval:number;

    public static init () {
        this.render();
        this.resume();
    }

    public static render () {
        ReactDOM.render(React.createElement(App), document.getElementById('root'));
    }

    private static update ():void {
        for (let lTimer of Timer.list) lTimer.update();
    }

    public static resume ():void {
        this.interval = window.setInterval(() => this.update(), this.timeStep);
    }

    public static pause ():void {
        clearInterval(this.interval);
    }

    /*public static isRendering:boolean;

    public static resume () {
        this.isRendering = true;
        let recursiveRender:FrameRequestCallback = () => {
            this.render();
            if (this.isRendering) requestAnimationFrame(recursiveRender);
        };
        requestAnimationFrame(recursiveRender);
    }

    public static pause () {
        this.isRendering = false;
    }*/

}

Main.init();
// (window as any).pause = Main.pause.bind(Main);