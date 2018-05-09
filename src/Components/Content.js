import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Content extends Component {
    static propTypes = {
        fetchEggs: PropTypes.func,
        data: PropTypes.array,
        loading: PropTypes.bool,
    };

    render() {
        return (
            <div>
                <button onClick={() => this.props.fetchEggs()}>Get</button>
                {this.props.loading &&
                    <p>fetching eggs</p>
                }
            </div>
        )
    }
};
