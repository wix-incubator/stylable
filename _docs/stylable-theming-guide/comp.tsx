import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import Button from './button';
import style from './comp.st.css';

export interface CompProps {
    className: string;
}

export class Comp extends React.Component<CompProps, {}> {
    static defaultProps: CompProps = {className: ''};

    render() {
        return (
            <div>
                <Button className="submitButton">OK</Button>
                <Button className="cancelButton">Cancel</Button>
            </div>
        );
    }
}

export default SBComponent(Comp, style);
