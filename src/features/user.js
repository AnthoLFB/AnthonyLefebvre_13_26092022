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

    // Used to check if an error already exists. If errorStatus is null then it takes the value true, otherwise it takes the existing state.
    const errorStatus = isThereAnError(store.getState()) ?? true;

    // Route to communicate with the API.
    const fetchRoute = `${process.env.REACT_APP_API_SERVER_ADDRESS}/api/v1/user/login`;

    // Retrieval of fields filled in by the user.
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    // Options to be passed when sending the request to the API.
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
        // Executing the query and processing the result.
        fetch(fetchRoute, requestOptions)
        .then((response) => response.json())
        .then((result) => {

            //If the API returns a code 200 then the data can be processed.
            if(result.status === 200)
            {
                // Simple optimization to avoid unnecessary call to action. Checks if there is an error. If so then the action is called to reset the error message displayed to the user.
                if(errorStatus !== true){store.dispatch(displayErrorToUser(null));}

                // Attention, for the development the token is stored in the localStorage. It should be stored in the cookies for more security.
                localStorage.setItem("jwt", result.body.token);

                // Calls the action to change the user's connection status.
                store.dispatch(updateUserLoginStatus(true));
                return
            }
            // If the API returns a code other than 200, an error has occurred and is processed. 
            else
            {
                const error = {
                    code: result.status, 
                    message: result.message
                }

                // Calls the action to store the error message for display to the user.
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
    
    const errorStatus = isThereAnError(store.getState()) ?? true;

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
                if(errorStatus !== true){store.dispatch(displayErrorToUser(null));}
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
    // Use of Immer to avoid destructuring errors.
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
