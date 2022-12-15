//Immer
import {produce} from 'immer';

//Selectors Redux
import { isThereAnError } from '../utils/selectors';

//Init
const initialState = {
    isUserLoggedIn: false,
    data: null,
    error: null
}

//Actions
const UPDATE_USER_LOGIN_STATUS = "updateUserStatus";
const DISPLAY_ERROR = "dispayErrorToUser";
const GET_USER = "userDataRecovery";

//Action creator
const updateUserLoginStatus = (userLoginStatus) => ({type: UPDATE_USER_LOGIN_STATUS, payload: userLoginStatus });
const displayErrorToUser = (error) => ({type: DISPLAY_ERROR, payload: error});

export  async function getUserToken(e, store) 
{
    e.preventDefault();

    const errorStatus = isThereAnError(store.getState()) ?? true;

    const fetchRoute = `${process.env.REACT_APP_API_SERVER_ADDRESS}/api/v1/user/login`;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    const requestOptions = 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    };

    try
    {
        fetch(fetchRoute, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if(result.status === 200)
            {
                if(errorStatus !== true){store.dispatch(displayErrorToUser(null));}
                localStorage.setItem("jwt", result.body.token);
                store.dispatch(updateUserLoginStatus(true));
                return
            }
            else
            {
                const error = {
                    code: result.status, 
                    message: result.message
                }
                store.dispatch(displayErrorToUser(error));
                return
            }
        });
    }
    catch (error)
    {
        console.log("An error occurred while retrieving the token. " + error);
    }
}

export async function getUserProfile(token, store)
{
    
    const fetchRoute = `${process.env.REACT_APP_API_SERVER_ADDRESS}/api/v1/user/profile`;
    
    const requestOptions = 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    try
    {
        fetch(fetchRoute, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if(result.status === 200)
            {
                const id = result.body.id
                const firstName = result.body.firstName;
                const lastName = result.body.lastName
                let user = 
                {
                    id: id, 
                    firstName: firstName,
                    lastName: lastName
                }
                store.dispatch(displayErrorToUser(null));
                store.dispatch({type: GET_USER, payload: user});
            }
            else
            {
                const error = {
                    code: result.status, 
                    message: result.message
                }
                store.dispatch(displayErrorToUser(error));
            }
        });
    }
    catch (error)
    {
        console.log(error);
    }
    
}

//Reducer
export default function userReducer(state = initialState, action)
{
    return produce(state, draft => {
        switch (action.type) {
            case UPDATE_USER_LOGIN_STATUS: 
            {
                draft.isUserLoggedIn = action.payload;
                return draft
            }

            case DISPLAY_ERROR: 
            {
                draft.error = action.payload;
                return draft
            }

            case GET_USER:
            {
                draft.data = action.payload;
                return   
            }

            default:
                return;
        }
    })
}
