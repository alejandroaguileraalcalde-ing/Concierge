import React from 'react';
import {Redirect} from "react-router-dom";
import {Alert, AlertTitle} from "@material-ui/lab";
import './profile.css'
import update from 'react-addons-update';
import NavBar from "./NavBar";


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...this.props.client};
        this.timer = null;

    }

    componentDidMount() {
        if (this.props.login.conditionsAccepted) {
            let alert = document.querySelector('#alert-profile');
            if (this.props.login.isLogged) {
                this.timer = setTimeout(() => alert.style.display = 'none', 3000)
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        if (this.props.login.isLogged) {
            return (
                <div>
                    {(this.props.login.conditionsAccepted) ?
                        (<div className={"profileMain"}>
                            <NavBar/>

                            <h1>Gestión del perfil</h1>

                            <Alert severity="success" id="alert-profile">
                                <AlertTitle>Welcome</AlertTitle>
                                Here you can see your profile and  <strong>change it</strong>
                            </Alert>

                            <div className={"information"}>
                                <img src={ this.props.client.profile.photo.filename ?
                                    process.env.PUBLIC_URL + "/" + this.props.client.profile.photo.filename :
                                    "https://www.learning.uclg.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-"
                                }
                                     alt={"Sin foto de perfil"}/>
                                <div className={"box"}>
                                    <h3>Full name: {this.props.client.profile.name} </h3>
                                    <h3>Room: {this.props.client.room}</h3>
                                    <h3>DNI: {this.props.client.DNI}</h3>
                                    <h3>Email:
                                        <input type="text" id="email" placeholder={this.state.profile.email}
                                               value={this.state.profile.email}
                                               onChange={(e) => {
                                                   let newState = update(this.state, {
                                                       profile: {email: {$set: e.target.value}}
                                                   });
                                                   this.setState(newState);
                                               }
                                               }
                                        />
                                    </h3>
                                    <h3>Phone:
                                        <input type="text" id="username" placeholder={this.state.profile.phone}
                                               value={this.state.profile.phone}
                                               onChange={(e) => {
                                                   let newState = update(this.state, {
                                                       profile: {phone: {$set: e.target.value}}
                                                   });
                                                   this.setState(newState);
                                               }
                                               }
                                        />
                                    </h3>

                                    <h3>Name:
                                        <input type="text" id="password" placeholder={this.state.profile.name}
                                               value={this.state.profile.name}
                                               onChange={(e) => {
                                                   let newState = update(this.state, {
                                                       profile: {name: {$set: e.target.value}}
                                                   });
                                                   this.setState(newState);
                                               }
                                               }
                                        />
                                    </h3>
                                    <ul>
                                        <li>
                                            <button onClick={() => this.props.update(this.state)}>
                                                Change
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={this.props.endSession}> Logout</button>
                                        </li>
                                    </ul>
                                    <div style={{clear: "both"}}>{}</div>
                                </div>

                            </div>



                        </div>)
                        :
                        (<Redirect to="/welcome/"/>)}

                </div>

            );
        } else {
            return (<Redirect to="/login/"/>);
        }
    }
}
