import React, {Component} from 'react';

class ValidPaymentProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: this.props.profileData,
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