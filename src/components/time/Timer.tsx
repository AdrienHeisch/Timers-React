import * as styles from './Timer.css';

import * as React from 'react';
import { Card, CircularProgress, Button, IconButton, Menu,  MenuItem, Dialog, TextField, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ReplayIcon from '@material-ui/icons/Replay';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Delete';
import { TimePicker } from 'material-ui-time-picker'

import FormatTime from '../../utils/time/FormatTime';
import LogicTimer from '../../utils/time/Timer';
import MathTools from '../../utils/MathTools';

export default class Timer extends React.Component<ITimerProps, ITimerState> {

    public static readonly list:Array<Timer> = [];

    private readonly timer:LogicTimer = new LogicTimer();
    private readonly date:Date = new Date();

    /**
     * In milliseconds.
     */
    private goal:number = 0;

    constructor (pProps:ITimerProps) {
        super(pProps);
        Timer.list.push(this);

        this.timer.resume();

        this.state = {
            name: pProps.name,
            timeDisplay: '',
            timerIsRunning: this.timer.isRunning,
            controlsMenuAnchor: undefined,
            goalDialog: false,
            resetDialog: false,
            removeDialog: false,
            timeInput: 0,
            nameInput: '',
            nameDialog: false,
            toBeDeleted: false
        }
    }

    public update ():void {
        this.timer.update();
        this.date.setTime(this.timer.elapsedTime);

        let lFormattedDate:string = FormatTime.toString(this.date);
        if (lFormattedDate !== this.state.timeDisplay) this.setState({ timeDisplay: lFormattedDate });
    }

    private getCompletion ():number {
        return this.goal > 0 ? Math.round(100 * this.timer.elapsedTime / this.goal) : 0;
    }

    private closeControls ():void {
        this.setState({
            controlsMenuAnchor: undefined,
            nameDialog: false,
            goalDialog: false,
            resetDialog: false,
            removeDialog: false
        });
    }

    public delete ():void {
        Timer.list.splice(Timer.list.indexOf(this), 1);
        this.setState({ toBeDeleted: true });
    }

    public render ():JSX.Element {
        return (
            <Card className={ styles.card }>

                <div className={ styles.header }>
                    <h1>{ this.state.name }</h1>
                    <h2>{ this.state.timeDisplay }</h2>
                </div>

                <div className={ styles.controls }>
                    <div>
                        <IconButton onClick={ () => { this.timer.isRunning ? this.timer.pause() : this.timer.resume(); this.setState({ timerIsRunning: this.timer.isRunning }); } }>
                            { this.state.timerIsRunning ? <PauseIcon color='secondary' /> : <PlayIcon /> }
                        </IconButton>
                    </div>

                    <div>
                        <IconButton onClick={ (pEvent:React.MouseEvent<HTMLButtonElement>) => this.setState({ controlsMenuAnchor: pEvent.currentTarget }) }>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            anchorEl={ this.state.controlsMenuAnchor }
                            open={ this.state.controlsMenuAnchor !== undefined }
                            onClose={ () => this.closeControls() }
                        >
                            <MenuItem onClick={ () => this.setState({ nameDialog: true }) }><EditIcon />  Set name</MenuItem>
                            <Dialog
                                open={ this.state.nameDialog }
                                onClose={ () => this.closeControls() }
                            >
                                <DialogTitle>Enter new name:</DialogTitle>
                                <DialogContent>
                                    <TextField value={ this.state.nameInput } onChange={ (pEvent:React.ChangeEvent<HTMLInputElement>) => this.setState({ nameInput: pEvent.currentTarget.value }) }  />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={ () => this.closeControls() } color="primary">
                                        Cancel
                                    </Button>
                                    <Button type='submit' onClick={ () => { this.setState({ name: this.state.nameInput }); this.closeControls(); } } color='primary'>
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <MenuItem onClick={ () => this.setState({ goalDialog: true }) }><EditIcon />  Set goal</MenuItem>
                            <Dialog
                                open={ this.state.goalDialog }
                                onClose={ () => this.closeControls() }
                            >
                                <TimePicker
                                    defaultValue={ new Date(0, 0, 0, 0, 0, 0, this.goal) }
                                    mode='24h'
                                    onChange={ (pDate:Date) => this.setState({ timeInput: Date.UTC(1970, 0, 1, pDate.getHours(), pDate.getMinutes()) }) }
                                />
                                <DialogActions>
                                    <Button onClick={ () => this.closeControls() } color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={ () => { this.goal = this.state.timeInput; this.closeControls(); } } color='primary'>
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <MenuItem onClick={ () => this.setState({ resetDialog: true }) }><ReplayIcon />  Reset</MenuItem>
                            <Dialog
                                open={ this.state.resetDialog }
                                onClose={ () => this.closeControls() }
                            >
                                <DialogTitle>Reset this timer ?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={ () => this.closeControls() } color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={ () => { this.timer.reset(); this.closeControls(); } } color="primary" autoFocus>
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            
                            <MenuItem onClick={ () => this.setState({ removeDialog: true }) }><RemoveIcon />  [WIP] Remove</MenuItem>
                            <Dialog
                                open={ this.state.removeDialog }
                                onClose={ () => this.closeControls() }
                            >
                                <DialogTitle>Remove this timer ?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={ () => this.closeControls() } color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={ () => { this.closeControls(); this.delete(); } } color="primary" autoFocus>
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Menu>
                    </div>
                </div>

                <div className={ styles.info }>
                    <div><CircularProgress
                            size="5em"
                            variant="static"
                            value={ MathTools.clamp(this.getCompletion(), 0, 100) }
                    /></div>
                    <span>{ this.getCompletion() + '%' }</span>
                </div>

            </Card>
        );
    }

}

export interface ITimerProps {
    name:string;
}

interface ITimerState {
    name:string;
    timeDisplay:string;
    timerIsRunning:boolean;
    controlsMenuAnchor:HTMLElement;
    goalDialog:boolean;
    resetDialog:boolean;
    removeDialog:boolean;
    timeInput:number;
    nameInput:string;
    nameDialog:boolean;
    toBeDeleted:boolean;
}