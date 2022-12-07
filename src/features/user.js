import {produce} from 'immer';

const initialState = {
    isUserLoggedIn: false,
    userToken: null,
    data: null,
    error: null
}

//Actions
const UPDATE_USER_LOGIN_STATUS = "updateUserStatus";
const DISPLAY_ERROR = "dispayErrorToUser";

//Action creator

const updateUserLoginStatus = (userLoginStatus) => ({type: UPDATE_USER_LOGIN_STATUS, payload: userLoginStatus });

const displayErrorToUser = (error) => ({type: DISPLAY_ERROR, payload: error});

export  async function getUserToken(e, store) 
{
    e.preventDefault();
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
                store.dispatch(displayErrorToUser(null));
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
            default:
                return;
        }
    })
}
