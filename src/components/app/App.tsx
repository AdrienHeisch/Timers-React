import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@material-ui/core';

import Category, { ICategoryProps } from './../category/Category';

import * as styles from './App.css';

export default class App extends React.Component<IAppProps, IAppState> {

    private categories:Array<ICategoryProps> = [];

    constructor (pProps:IAppProps) {
        super(pProps);
        
        this.state = {
            addCategoryDialog: false,
            nameInput: ''
        }
    }

    private addCategory (pName:string):void {
        this.categories.push({
            name: pName
        } as ICategoryProps);
        this.forceUpdate();
    }

    public render ():JSX.Element {
        return (
            <React.Fragment>
                {
                    this.categories.map(
                        (pProps:ICategoryProps) => 
                        <Category key={ pProps.name } {...pProps} />
                    )
                }
                <div className={ styles.addCategoryButton }>
                    <Button
                        variant='fab'
                        onClick={ () => this.setState({ addCategoryDialog: true }) }
                        color='secondary'
                    >
                        +
                    </Button>
                </div>
                <Dialog
                    open={ this.state.addCategoryDialog }
                    onClose={ () => this.setState({ addCategoryDialog: false }) }
                >
                    <DialogTitle>Enter category name:</DialogTitle>
                    <DialogContent>
                        <TextField value={ this.state.nameInput } onChange={ (pEvent:React.ChangeEvent<HTMLInputElement>) => this.setState({ nameInput: pEvent.currentTarget.value }) }  />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.setState({ addCategoryDialog: false }) } color="primary">
                            Cancel
                        </Button>
                        <Button type='submit' onClick={ () => { this.addCategory(this.state.nameInput); this.setState({ addCategoryDialog: false, nameInput: '' }); } } color='primary'>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }

}

export interface IAppProps {}

interface IAppState {
    addCategoryDialog:boolean;
    nameInput:string;
}