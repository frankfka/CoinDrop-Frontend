// TODO: This isn't needed quite yet - re-evaluate later
/*
Profile Page
 */
export const PROFILE_LOAD_OK = 'PROFILE_LOAD_OK';
export const PROFILE_LOAD_ERROR = 'PROFILE_LOAD_ERROR';
export const ProfileLoadErrorType = {
  INVALID_ID: 'INVALID_ID',
  SERVER_ERROR: 'SERVER_ERROR'
};
export function profileLoadOk(profileData) {
    return { type: PROFILE_LOAD_OK, data: profileData }
}
export function profileLoadError(error, errorType) {
    return { type: PROFILE_LOAD_ERROR, error: error, errorType: errorType }
}