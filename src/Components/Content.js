import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Divider from 'material-ui/Divider';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export class Egg extends Component {
    render() {
        let egg = this.props.details;
        return (
            <ListItem className="egg">
                <Avatar className={egg.label.toLowerCase()}>
                    {egg.label}
                </Avatar>
                <ListItemText primary={egg.name} secondary={'Price £' + egg.price} />
                <Rater rating={egg.rating} total={5} />
            </ListItem>
        )
    }
}

export class EggWrapper extends Component {
    renderEggs = eggs => {
        const mapEggs = (eggs) => {
            return eggs.map((egg, key) => {
                return <Egg details={egg} key={key} />;
            });
        } 
        if (this.props.display === 'initialState') {
            return mapEggs(eggs);
        }
        if (this.props.display === 'orderByHighLowRating') {
            const orderItems = eggs.sort(function(a, b) {
                return b.rating - a.rating;
            })
            return mapEggs(orderItems);
        }
        if (this.props.display === 'orderByLowHighRating') {
            const orderItems = eggs.sort(function(a, b) {
                return a.rating - b.rating;
            })
            return mapEggs(orderItems);
        }
        if (this.props.display === 'orderAlphabetically') {
            const orderItems = eggs.sort(function(a, b) {
                return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
            })
            return mapEggs(orderItems);
        }
    }

    render() {
        return (
            <List className="eggWrapperComponent">
                {this.renderEggs(this.props.eggs)}
            </List>
        )
    }
}

export default class Content extends Component {
    static propTypes = {
        fetchSweetEggs: PropTypes.func,
        fetchSavouryEggs: PropTypes.func,
        sweetEggs: PropTypes.array, // change to just eggs
        loading: PropTypes.bool,
        doEverything: PropTypes.func,
    };

    componentWillMount() {
        this.props.doEverything();
        this.setState({
            display: 'initialState'
        });
    }
    reFetchData = () => {
        this.props.doEverything();
    }

    render() {
        return (
            <div className="wrapper">
                <Grid container spacing={24} alignItems="flex-start" direction="row" justify="flex-start">
                    <Grid item xs={4}>
                        <Paper className="paper">
                            <h3>Re-order eggs</h3>
                            <Button
                                fullWidth
                                className="button"
                                variant="raised"
                                color="primary"
                                onClick={() => this.setState({display: 'orderByHighLowRating'})}
                            >Rating: High to Low</Button>
                            <Divider light className="divider" />
                            <Button
                                fullWidth
                                className="button"
                                variant="raised"
                                color="primary"
                                onClick={() => this.setState({display: 'orderByLowHighRating'})}
                            >Rating: Low to high</Button>
                            <Divider light className="divider" />
                            <Button
                                fullWidth
                                className="button"
                                variant="raised"
                                color="secondary"
                                onClick={() => this.setState({display: 'orderAlphabetically'})}
                            >Alphabetically</Button>
                            <Divider light className="divider" />
                            <Button
                                fullWidth
                                className="button"
                                variant="raised"
                                onClick={() => this.props.doEverything()}
                            >Get fresh eggs</Button>
                            <Divider light className="divider" />
                            <Button
                                fullWidth
                                className="button"
                                variant="raised"
                                onClick={() => this.props.fetchSweetEggs()}
                            >Get Sweet only</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        {!this.props.loading && this.state.display === 'orderByHighLowRating' &&
                            <Paper className="paper">
                                <h3>Order high to low</h3>
                                <EggWrapper eggs={this.props.sweetEggs} display={this.state.display} />
                            </Paper>
                        }
                        {!this.props.loading && this.state.display === 'orderByLowHighRating' &&
                            <Paper className="paper">
                                <h3>Order low to high</h3>
                                <EggWrapper eggs={this.props.sweetEggs} display={this.state.display} />
                            </Paper>
                        }
                        {!this.props.loading && this.state.display === 'orderAlphabetically' &&
                            <Paper className="paper">
                                <h3>Order alphabetically</h3>
                                <EggWrapper eggs={this.props.sweetEggs} display={this.state.display} />
                            </Paper>
                        }
                        {!this.props.loading && this.state.display === 'initialState' &&
                            <Paper className="paper">
                                <h3>Scrambled eggs</h3>
                                <EggWrapper eggs={this.props.sweetEggs} display={this.state.display} />
                            </Paper>
                        }
                        {this.props.loading &&
                            <Paper className="paper">
                                <CircularProgress className="spinner" />
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
};
