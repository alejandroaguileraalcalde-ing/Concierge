import React from 'react';
import "./login.css";

import {NavLink, Redirect} from "react-router-dom";
import { ArrowBack } from '@material-ui/icons';
import {Alert, AlertTitle} from '@material-ui/lab';

// NO TOCAR

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.timerlog = null;
    }
    componentDidMount() {
        let alert = document.querySelector('#alert');
        this.timerlog = setTimeout(() => alert.style.visibility = 'hidden', 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timerlog);
    }

    render(){
        let message, title;
        switch (this.props.login.status) {
            case "error":
                title = "Error";
                message = "Username or password incorrect"
                break;

            case "info":
                title = "Log in";
                message = "You need to be logged to see your profile"
                break;

            case "warning":
                title = "Warning";
                message = "Maximum number of attempts reached - Account locked"
                break;

            case "success":
                break;

            default:
                console.log(this.props.login.status);
        }


        return (
            <div className="mainLogin">
                {(this.props.login.isLogged)?
                    (
                        <Redirect to="/profile/" />

                    ): (
                        <div className="sub">
                            <NavLink to="/" id="arrow"> <ArrowBack/> </NavLink>

                            <div className="header">
                                <h1>CONCIERGE</h1>
                            </div>

                            <div className="tittle">
                                <h2>User login</h2>
                            </div>

                            <input type="text"
                                   placeholder="DNI"
                                   name="dni"
                                   className="user"
                                   value={this.props.login.dniAnswer || ''}
                                   onChange={(event) => this.props.onUserAnswer(event.target.value)}/>

                            <input type="text"
                                   placeholder="Room"
                                   name="room"
                                   className="pass"
                                   value={this.props.login.roomAnswer || ''}
                                   onChange={(event) => this.props.onUserAnswer(this.props.login.dniAnswer, event.target.value)}/>

                            <div className="submitLogin">
                                <button onClick={this.props.submitFunction}> Submit </button>
                            </div>


                            <Alert severity={this.props.login.status} id="alert">
                                <AlertTitle>{title}</AlertTitle>
                                <span>{message}</span>
                            </Alert>

                        </div>
                    )
                }
            </div>

    );
}
}

