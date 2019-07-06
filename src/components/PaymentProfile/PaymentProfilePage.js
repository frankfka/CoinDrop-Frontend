import React, {Component} from 'react';

import {getProfile} from '../../utils/networkUtil'

import ValidPaymentProfilePage from './ValidPaymentProfilePage';
import InvalidPaymentProfilePage from "./InvalidPaymentProfilePage";
import {FullScreenLoading} from "../Common/Loading";

// TODO: Re-evaluate the nesting of these pages
class PaymentProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            profileData: null
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                // Conditional rendering based on whether the ID given is valid
                !this.state.error ?
                    PaymentProfilePage.validPaymentProfile({profileData: this.state.profileData})
                    : PaymentProfilePage.invalidPaymentProfile()
            )
        } else {
            return <FullScreenLoading/>
        }
    }

    componentDidMount() {
        let profileId = this.props.match.params.id;
        if (profileId) {
            getProfile(profileId)
                .then(profile => {
                    // Check that data returned is valid by comparing input & output profile ID
                    if (profile && profile.profileId === profileId) {
                        this.profileLoadSuccess(profile);
                    } else {
                        this.profileLoadError("Invalid payment profile response object.");
                    }
                })
                .catch(err => {
                    this.profileLoadError(Error(err))
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

    // TODO: display this error somehow
    profileLoadError(error) {
        console.error(error.message);
        console.error(error.response.data.error);
        this.setState({
            loading: false,
            error: error
        })
    }


    /*
    RENDER METHODS
     */

    // Render page for a valid payment profile
    static validPaymentProfile(props) {
        return (
            <ValidPaymentProfilePage {...props}/>
        )
    }

    // Render page for an invalid payment profile
    static invalidPaymentProfile() {
        return (
            <InvalidPaymentProfilePage/>
        )
    }

}

export default PaymentProfilePage;