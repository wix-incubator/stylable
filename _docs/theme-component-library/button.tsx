import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import style from './button.st.css';

export interface ButtonProps {
    className: string;
}

class Button extends React.Component<ButtonProps, {}> {
    static defaultProps: ButtonProps = {className: ''};

    render () {
        return (
            <button>
                <div className="icon"/>
                <span className="label">Click Here!</span>
            </button>
        );
    }
}

export default SBComponent(Button, style);
