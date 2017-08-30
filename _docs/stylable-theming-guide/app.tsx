import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import Button from './button';
import style from './app.st.css';

export interface AppProps {
    className: string;
}

class App extends React.Component<AppProps, {}> {
    static defaultProps: AppProps = {className: ''};

    render() {
        return (
            <div>
                <input className="emailInput"/>
                <input className="passwordInput"/>
                <Button className="submitButton">OK</Button>
                <Button className="cancelButton">Cancel</Button>
            </div>
        );
    }
}

export default SBComponent(App, style);
