import axios from 'axios';

import {API_PROFILE_URL, API_COIN_INFO_URL, API_GET_QR_URL} from '../constants/networking';

/*
Attempts to retrieve profile data from backend & returns a promise
Returns the following:
    profileId (string)
    dateCreated
    profileName
    paymentMethods [{ currencyCode, data }]
 */
export async function getProfile(profileId) {
    return await axios.get(API_PROFILE_URL, {
        params: {
            profileId: profileId
        }
    })
}

/*
Attempts to save a profile & returns a promise
Expects the following:
    paymentMethods [{ currencyCode, data }]
 */
export async function saveProfile(profileData) {
    return await axios.put(API_PROFILE_URL, {
        ...profileData
    })
}

/*
 Attempts to retrieve coin data from backend & returns a promise
 */
export async function getCoinInfo(coins) {
    return await axios.get(API_COIN_INFO_URL, {
        params: {
            currencyCodes: coins.join(',')
        }
    })
}