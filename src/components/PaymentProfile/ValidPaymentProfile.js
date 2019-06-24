import React, {Component} from 'react';

class ValidPaymentProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profileData: this.props.profileData,
            error: null
        }
    }

    render() {
        return (
            <div>
                {this.state.profileData.profileId}
            </div>
        )
    }
}

export default ValidPaymentProfile;