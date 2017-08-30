import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import Button from './button';
import style from './project.st.css';

export interface ProjectProps {
    className: string;
}

class Project extends React.Component<ProjectProps, {}> {
    static defaultProps: ProjectProps = {className: ''};

    render() {
        return (
            <div className="root">
                <Button className="cancelButton">Cancel</Button>
                <Button className="submitButton">OK</Button>
            </div>
        );
    }
}

export default SBComponent(Project, style);
