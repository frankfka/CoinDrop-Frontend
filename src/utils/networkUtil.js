import axios from 'axios';

import { API_PROFILE_URL, API_COIN_INFO_URL } from '../constants/networking';

/*
Attempts to retrieve profile data from backend & returns a promise
Returns the following:
    profileId (string)
    dateCreated
    profileName
    paymentMethods []
 */
export async function getProfile(profileId) {
    return await axios.get(API_PROFILE_URL, {
        params: {
            profileId: profileId
        }
    })
}

// Attempts to retrieve coin data from backend, returns a promise
export async function getCoinInfo(coins) {
    return await axios.get(API_COIN_INFO_URL, {
        params: {
            currencyCodes: coins.join(',')
        }
    })
}