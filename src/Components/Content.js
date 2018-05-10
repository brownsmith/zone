import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
// import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

class Egg extends Component {
    render() {
        let egg = this.props.details;
        return (
            <div>
                {egg.name} | 
                {egg.rating} | 
                {egg.price}
            </div>
        )
    }
}

class EggWrapper extends Component {
    renderEggs = eggs => {
        if (this.props.display === 'initialState') {
            return eggs.map((egg, key) => {
                return (
                    <li key={key}>
                        <Egg details={egg} />
                    </li>
                );
            });
        }
        if (this.props.display === 'orderByRating') {
            const orderItems = eggs.sort(function(a, b) {
                return a.rating - b.rating;
            })
            return orderItems.map((egg, key) => {
                return (
                    <li key={key}>
                        <Egg details={egg} />
                    </li>
                );
            });
        }
        if (this.props.display === 'orderAlphabetically') {
            const orderItems = eggs.sort(function(a, b) {
                return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
            })
            return orderItems.map((egg, key) => {
                return (
                    <li key={key}>
                        <Egg details={egg} />
                    </li>
                );
            });
        }
    }

    render() {
        return (
            <ul>
                {this.renderEggs(this.props.eggs)}
            </ul>
        )
    }
}

export default class Content extends Component {
    static propTypes = {
        fetchEggs: PropTypes.func,
        sweetEggs: PropTypes.array,
        loading: PropTypes.bool,
    };

    componentWillMount() {
        this.props.fetchSweetEggs();
        this.props.fetchSavouryEggs();
        this.setState({
            display: 'initialState'
        });
    }

    componentDidMount() {
        console.log('props of mounted component', this.props.eggs);
    }

    render() {
        return (
            <div className="wrapper">
                <Paper className="spacer">
                    <Button variant="raised" color="primary" onClick={() => this.setState({display: 'orderByRating'})}>Order by rating</Button>
                    <Button variant="raised" color="primary" onClick={() => this.setState({display: 'orderAlphabetically'})}>Order alphabetically</Button>
                    <EggWrapper eggs={this.props.sweetEggs} display={this.state.display} />
                    {this.props.loading &&
                        <CircularProgress />
                    }
                </Paper>
            </div>
        )
    }
};
