//Immer
import {produce} from 'immer';

//Selectors Redux
import { isThereAnError, userData } from '../utils/selectors';

//Init
const initialState = {
    isUserLoggedIn: false,
    data: null,
    error: null
}

//Actions
const UPDATE_USER_LOGIN_STATUS = "updateUserStatus";
const UPDATE_USER_PROFILE = "updateUserProfile";
const DISPLAY_ERROR = "dispayErrorToUser";
const GET_USER = "userDataRecovery";
const LOGOUT = "userLogout";

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
    // Used to check if an error already exists. If errorStatus is null then it takes the value true, otherwise it takes the existing state.
    const errorStatus = isThereAnError(store.getState()) ?? true;

    // Route to communicate with the API.
    const fetchRoute = `${process.env.REACT_APP_API_SERVER_ADDRESS}/api/v1/user/profile`;
    
    // Options to be passed when sending the request to the API.
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
        // Executing the query and processing the result.
        fetch(fetchRoute, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            
            //If the API returns a code 200 then the data can be processed.
            if(result.status === 200)
            {
                // Creation of a user object with the received data.
                const id = result.body.id
                const firstName = result.body.firstName;
                const lastName = result.body.lastName
                let user = 
                {
                    id: id, 
                    firstName: firstName,
                    lastName: lastName
                }

                // Simple optimization to avoid unnecessary call to action. Checks if there is an error. If so then the action is called to reset the error message displayed to the user.
                if(errorStatus !== true){store.dispatch(displayErrorToUser(null));}

                // Calls the action to store the user's data.
                store.dispatch({type: GET_USER, payload: user});
                return
            }
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
        console.log(error);
    }
}

export async function updateUserProfile(e, store)
{
    e.preventDefault(); 

    const token = localStorage.getItem("jwt");

    const errorStatus = isThereAnError(store.getState()) ?? true;
    const user = userData(store.getState());

    const currentFirstName = user.firstName;
    const currentLastName = user.lastName;

    const newFirstName = document.getElementById('update-form__firstName').value;
    const newLastName = document.getElementById('update-form__lastName').value;

    if(newFirstName.length === 0 || newLastName.length === 0)
    {
        const error = 
        {
            code: null,
            message: "Error: Fields cannot be empty."
        }
        store.dispatch(displayErrorToUser(error));
        return
    }
    else if(newFirstName === currentFirstName || newLastName === currentLastName)
    {
        const error = 
        {
            code: null,
            message: "Error: The fields cannot be identical. At least one of them must be different."
        }
        store.dispatch(displayErrorToUser(error));
        return
    }
    else
    {
        const fetchRoute = `${process.env.REACT_APP_API_SERVER_ADDRESS}/api/v1/user/profile`;
    
        const requestOptions = 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstName: newFirstName,
                lastName: newLastName
            })
        };

        try
        {
            fetch(fetchRoute, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status === 200)
                {
                    const newUserData = 
                    {
                        firstName: newFirstName,
                        lastName: newLastName
                    };
                    store.dispatch({type: UPDATE_USER_PROFILE, payload: newUserData});
                    if(errorStatus !== true){store.dispatch(displayErrorToUser(null))};
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
            console.log(error);
        }
    }
}

export function logout(store)
{
    // Returns the initial state and deletes the data contained in the localStorage.
    localStorage.clear();
    store.dispatch({type: LOGOUT});
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

            case UPDATE_USER_PROFILE:
            {
                draft.data.firstName = action.payload.firstName;
                draft.data.lastName = action.payload.lastName;
                return
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

            case LOGOUT:
            {
                return initialState;   
            }

            default:
                return;
        }
    })
}
