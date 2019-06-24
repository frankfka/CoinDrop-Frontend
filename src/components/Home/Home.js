import React, {Component} from 'react';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null
        }
    }

    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}

export default HomePage;