import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercise extends Component { 
    constructor(props) {
        // in JS
        // calling super in constructor is always needed
        // when defining the constructor for a sub class 
        super(props);

        // This binding is necessary to make `this` work in the callback
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // state works like var
        // always use state to represent a variable
        // so that when state is changed, the page will be auto updated with new values
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        };
    }


    // React LifeCycle!!!
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
            .catch(err => console.log(err));

        // will be call right before anything display on the page
        axios.get('http://localhost:5000/users')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username)
                    })
                }
            })
            .catch(err => console.log(err));

    }

    // a method
    onChangeUsername(e) {

        // always ust setState method to update state in React
        this.setState({
            username: e.target.value
        });
    }

    
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }
    
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    // an submit event handler for the form
    onSubmit(e) {
        // prevent the default behavior from happening for this HTML form
        e.preventDefault();

        // you could still create var that only be using in the single method
        // but keep the component wise var in the this.state
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        console.log(exercise);

        
        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data)).catch(err => console.log(err));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                { // when {} in element, you could put JS in
                                    this.state.users.map(user => {
                                        return <option
                                            key={user}
                                            value={user}>
                                                {user}
                                            </option>;
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Edit"
                            className="btn btn-primary"
                            />
                    </div>
                </form>
            </div>
        )
    }
}