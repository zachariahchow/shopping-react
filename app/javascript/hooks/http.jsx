import { useReducer, useCallback } from 'react';
import axios from 'axios';

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null };
        case 'RESPONSE':
            return { ...httpState, loading: false, data: action.responseData };
        case 'ERROR':
            return { ...httpState, error: action.errorMessage };
        case 'CLEAR':
            return { ...httpState, error: null };
        default:
            throw new Error('Bad!');
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null,
        data: null
    })

    const sendGetRequest = async (url) => {
        dispatchHttp({ type: 'SEND' });

        try {

            const response = await axios.get(url);
            dispatchHttp({ type: 'RESPONSE', responseData: response.data });
            console.log(httpState.data);

        } catch (e) {
            dispatchHttp({ type: 'ERROR', errorMessage: 'Some shit happened' });
        }
    }

    return {
        responseData: httpState.data,
        sendGetRequest: sendGetRequest,
        error: httpState.error
    };
}

export default useHttp;