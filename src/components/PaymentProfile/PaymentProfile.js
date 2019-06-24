import React, {Component} from 'react';

import { getProfile } from '../../utils/networkUtil'

import ValidPaymentProfile from './ValidPaymentProfile';
import InvalidPaymentProfile from "./InvalidPaymentProfile";

class PaymentProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            profileData: null
        }
    }

    render() {
        return (
            // Conditional rendering based on whether the ID given is valid
            (!this.state.error && !this.state.loading) ?
                this.validPaymentProfile({profileData: this.state.profileData})
                : this.invalidPaymentProfile()
        )
    }

    componentDidMount() {
        let profileId = this.props.match.params.id;
        if (profileId) {
            getProfile(profileId)
                .then(res => {
                    // Check that data returned is valid by comparing input & output profile ID
                    if (res.data && res.data.profileId === profileId) {
                        this.profileLoadSuccess(res.data);
                    } else {
                        this.profileLoadError("Invalid payment profile response object.");
                    }
                })
                .catch(err => {
                    this.profileLoadError(Error(err.response.data.error))
                })
        } else {
            this.profileLoadError(Error("No profile ID given."))
        }
    }


    /*
    STATE METHODS
     */
    profileLoadSuccess(profileData) {
        this.setState({
            loading: false,
            profileData: profileData
        })
    }
    profileLoadError(error) {
        console.error(error.message);
        this.setState({
            loading: false,
            error: error
        })
    }


    /*
    RENDER METHODS
     */

    // Render page for a valid payment profile
    validPaymentProfile(props) {
        return (
            <ValidPaymentProfile {...props}/>
        )
    }

    // Render page for an invalid payment profile
    invalidPaymentProfile() {
        return (
            <InvalidPaymentProfile/>
        )
    }

}

export default PaymentProfile;