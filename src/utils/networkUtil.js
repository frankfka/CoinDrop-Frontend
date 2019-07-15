import axios from 'axios';
import CryptoJS from 'crypto-js'
import {
    API_PROFILE_URL,
    API_COIN_INFO_URL,
    API_ALL_COINS_URL,
    CLIENT_SIGNING_KEY,
    API_TIMESTAMP_HEADER_KEY,
    API_SIG_HEADER_KEY
} from '../constants/networking';

// Current time in ms
const getTimestamp = () => {
    return new Date().getTime();
};
// Signed signature for client validation
const getSignature = (requestInfoString, timestamp) => {
    return CryptoJS.HmacSHA256(`${timestamp}:${requestInfoString}`, CLIENT_SIGNING_KEY)
        .toString(CryptoJS.enc.Hex);
};
// Builds header object
const buildHeader = (requestInfo) => {
    const timestamp = getTimestamp();
    const signature = getSignature(JSON.stringify(requestInfo), timestamp);
    return {
        [API_TIMESTAMP_HEADER_KEY]: timestamp,
        [API_SIG_HEADER_KEY]: signature
    }
};

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
    const requestInfo = {
        profileId: profileId
    };
    let res = await axios.get(API_PROFILE_URL, {
        params: requestInfo,
        headers: buildHeader(requestInfo)
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
    const requestInfo = {
        ...profileData
    };
    let res = await axios.put(API_PROFILE_URL, requestInfo, {
        headers: buildHeader(requestInfo)
    });
    return res.data.profileId;
}

/*
 Attempts to retrieve coin data from backend & returns a promise
 Expects an array of currency codes

 Returns an array of coin objects in a promise
 */
export async function getCoinInfo(coins) {
    const requestInfo = {
        currencyCodes: coins.join(',')
    };
    let res = await axios.get(API_COIN_INFO_URL, {
        params: requestInfo,
        headers: buildHeader(requestInfo)
    });
    return res.data.rawCoinInfo;
}

/*
Retrieves a list of supported currencies from backend & returns a promise

Returns an array of currencyCodes in the promise
 */
export async function getSupportedCoins() {
    let res = await axios.get(API_ALL_COINS_URL, {
        headers: buildHeader({})
    });
    return res.data.allCoins
}