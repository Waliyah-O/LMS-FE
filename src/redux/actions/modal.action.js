import {HIDE_MODAL, SHOW_MODAL, MODAL_ACTION_LOADING} from "../types";

export const showModal = (modalType, data = {}) => {
    return {
        type: SHOW_MODAL,
        payload: modalType,
        modalData: data
    };
};

export const hideModal = () => {
    return {
        type: HIDE_MODAL,
    };
};


export const modalActionLoadingState = (loading) => {
    return {
        type: MODAL_ACTION_LOADING,
        data: loading,
    };
};
