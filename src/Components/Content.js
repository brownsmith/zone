import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Something extends Component {
    renderProducts = products => {
        if (this.props.display === 'initialState') {
            return products.map((product, key) => {
                return (
                    <li key={key}>{product.rating}</li>
                );
            });
        }
        if (this.props.display === 'orderByRating') {
            const orderItems = products.sort(function(a, b) {
                return a.rating - b.rating;
            })
            return orderItems.map((product, key) => {
                return (
                    <li key={key}>{product.rating}</li>
                );
            });
        }
        if (this.props.display === 'orderAlphabetically') {
            const orderItems = products.sort(function(a, b) {
                return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
            })
            return orderItems.map((product, key) => {
                return (
                    <li key={key}>{product.rating}</li>
                );
            });
        }
    }

    render() {
        return (
            <ul>
                {this.renderProducts(this.props.products)}
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
            <div>
                <button onClick={() => this.setState({display: 'orderByRating'})}>Order by rating</button>
                <button onClick={() => this.setState({display: 'orderAlphabetically'})}>Order alphabetically</button>
                <Something products={this.props.sweetEggs} display={this.state.display} />
                {this.props.loading &&
                    <p>fetching data spinner</p>
                }
            </div>
        )
    }
};
