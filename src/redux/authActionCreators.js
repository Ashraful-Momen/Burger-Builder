import * as actionType from "./actionType";
import axios from "axios";

//firebase : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

export const authSuccess = (token, userId) => {
	return {
		type: actionType.AUTH_SUCCESS,
		payload: {
			token: token,
			userId: userId,
		},
	};
};

//authLoading:
export const authLaoding=(isLoading)=>{
	return{
		type:actionType.AUTH_LOADING,
		payload:isLoading,
	}
}

//authFailed: 
export const authFailed=(errorMsg)=>{
	return{
		type:actionType.AUTH_FAILED,
		payload:errorMsg,
	}

}

export const auth = (email, password, mode) => {
	// console.log(email, password, mode);

	

	return (dispatch) => {
		dispatch(authLaoding(true)); // call authLoading () , show the spinner //if error fix here...
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true, // according to firebase.
		};
		let authUrl = null;

		if (mode === "Sing Up") {
			authUrl =
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
		} else {
			authUrl =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
		}

		const API_KEY = "AIzaSyDVbB5Z2Lbzj4LsY_ag2b4S0YVzoVa-MEc";
		axios
			.post(authUrl + API_KEY, authData)
			.then((response) => {

				dispatch(authLaoding(false)); // when Login/singIn then spinner false.

				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("userId", response.data.localId);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
				localStorage.setItem("expirationTime", expirationTime);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch((error) => {
				
				dispatch(authLaoding(false)); // when Login/singIn then spinner false. 
				dispatch(authFailed(error.response.data.error.message));
				// console.log(error.response.data.error.message);
				
			});
	};
};

//LogOut:

export const logout= ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    return{
        type:actionType.AUTH_LOGOUT
    }
}


// stay logIn with localStorage:
export const authCheck = () => {
    return (dispatch) => {
      const token = localStorage.getItem("token");
      if (!token) {
        // LogOut:
        dispatch(logout());
      } else {
        const expirationTime = new Date(localStorage.getItem("expirationTime"));
        if (expirationTime <= new Date()) {
          // LogOut
          dispatch(logout());
        } else {
          const userId = localStorage.getItem("userId"); // Fixed typo here
          dispatch(authSuccess(token, userId));
        }
      }
    };
  };


  