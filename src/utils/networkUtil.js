import axios from 'axios';

import {API_PROFILE_URL, API_COIN_INFO_URL, API_ALL_COINS_URL} from '../constants/networking';

/*
Attempts to retrieve profile data from backend & returns a promise
Returns the following:
    profileId (string)
    dateCreated
    profileName
    paymentMethods [{ currencyCode, data }]
in an object within the promise
 */
export async function getProfile(profileId) {
    let res = await axios.get(API_PROFILE_URL, {
        params: {
            profileId: profileId
        }
    });
    return res.data
}

/*
Attempts to save a profile & returns a promise
Expects the following:
    paymentMethods [{ currencyCode, data }]

Returns a profile ID in a promise
 */
export async function saveProfile(profileData) {
    let res = await axios.put(API_PROFILE_URL, {
        ...profileData
    });
    return res.data.profileId;
}

/*
 Attempts to retrieve coin data from backend & returns a promise
 Expects an array of currency codes

 Returns an array of coin objects in a promise
 */
export async function getCoinInfo(coins) {
    let res = await axios.get(API_COIN_INFO_URL, {
        params: {
            currencyCodes: coins.join(',')
        }
    });
    return res.data.rawCoinInfo;
}

/*
Retrieves a list of supported currencies from backend & returns a promise

Returns an array of currencyCodes in the promise
 */
export async function getSupportedCoins() {
    let res = await axios.get(API_ALL_COINS_URL);
    return res.data.allCoins
}