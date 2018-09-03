import * as styles from './Category.css';

import * as React from 'react';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Menu, MenuItem } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';

import Timer, { ITimerProps } from '../time/Timer';
export default class Category extends React.Component<ICategoryProps, ICategoryState> {

    private timers:Array<ICategoryProps> = [];

    constructor (pProps:ICategoryProps) {
        super(pProps);

        this.state = {
            name: pProps.name,
            nameInput: '',
            timerDialog: false,
            menuAnchor: undefined,
            nameDialog: false
        }
    }

    private addTimer (pName:string):void {
        this.timers.push({
            name: pName
        } as ITimerProps);
        this.forceUpdate();
    }

    private closeControls ():void {
        this.setState({
            timerDialog: false,
            nameInput: '',
            menuAnchor: undefined,
            nameDialog: false
        });
    }

    public render ():JSX.Element {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
                    <span className={ styles.name }>{ this.state.name }</span>
                    <span className={ styles.controls }>
                        <IconButton onClick={ (pEvent:React.MouseEvent<HTMLElement>) => { this.setState({ timerDialog: true }); pEvent.stopPropagation(); } }>
                            <AddIcon />
                        </IconButton>
                        <Dialog
                            open={ this.state.timerDialog }
                            onClick={ (pEvent) => pEvent.stopPropagation() }
                            onClose={ () => this.setState({ timerDialog: false }) }
                        >
                            <DialogTitle>Enter timer name:</DialogTitle>
                            <DialogContent>
                                <TextField value={ this.state.nameInput } onChange={ (pEvent:React.ChangeEvent<HTMLInputElement>) => this.setState({ nameInput: pEvent.currentTarget.value }) }  />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={ () => this.setState({ timerDialog: false }) } color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={ () => { this.addTimer(this.state.nameInput); this.setState({ timerDialog: false, nameInput: '' }); } } color='primary'>
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <IconButton onClick={ () => { (pEvent:React.MouseEvent<HTMLElement>) => { this.setState({ menuAnchor: pEvent.currentTarget }); pEvent.stopPropagation(); } } }>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            anchorEl={ this.state.menuAnchor }
                            open={ this.state.menuAnchor !== undefined }
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
                            {/*
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
                            
                            <MenuItem onClick={ () => this.setState({ removeDialog: true }) }><RemoveIcon />  Remove</MenuItem>
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
                            */}
                        </Menu>
                    </span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {
                        this.timers.map(
                            (pProps:ITimerProps) => 
                            <Timer key={ pProps.name } {...pProps} />
                        )
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

export interface ICategoryProps {
    name:string;
}

interface ICategoryState {
    name:string;
    nameInput:string;
    menuAnchor:HTMLElement,
    timerDialog:boolean;
    nameDialog:boolean;
}