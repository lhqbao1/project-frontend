import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    //when action redux doesnt send data
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    //when action redux send data
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguageApp = (languageInput) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    //send data
    language: languageInput
})