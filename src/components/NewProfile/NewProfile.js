import React, {Component} from 'react';

class NewProfile extends Component {

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
                New Profile
            </div>
        )
    }
}

export default NewProfile;