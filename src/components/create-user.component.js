import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component { 
    constructor(props) {
        // in JS
        // calling super in constructor is always needed
        // when defining the constructor for a sub class 
        super(props);

        // This binding is necessary to make `this` work in the callback
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // state works like var
        // always use state to represent a variable
        // so that when state is changed, the page will be auto updated with new values
        this.state = {
            username: ''
        };
    }
    
    // a method
    onChangeUsername(e) {

        // always ust setState method to update state in React
        this.setState({
            username: e.target.value
        });
    }

    // an submit event handler for the form
    onSubmit(e) {
        // prevent the default behavior from happening for this HTML form
        e.preventDefault();

        // you could still create var that only be using in the single method
        // but keep the component wise var in the this.state
        const user = {
            username: this.state.username
        };

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data)).catch(err => console.log(err));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Create User"
                            className="btn btn-primary"
                            />
                    </div>
                </form>
            </div>
        )
    }

}