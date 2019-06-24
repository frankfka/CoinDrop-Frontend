import axios from 'axios';

import { API_URL } from '../constants/networking';

// Attempts to retrieve profile data from backend & returns a promise
export async function getProfile(profileId) {
    return await axios.get(`${API_URL}?profileId=${profileId}`)
}