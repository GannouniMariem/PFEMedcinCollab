

const saveToken = (token) =>{
  localStorage.setItem("token", token);
}

const saveLoginStatus = (status) =>{
  localStorage.setItem('isLoggedIn', status);
}

const logIn = (res) =>{
    saveToken(res);
    saveLoginStatus(true)
}

const logout = () =>{
  localStorage.removeItem('token')
  localStorage.removeItem('isLoggedIn')
}


export const accountServices = {
    saveToken, logout,logIn, saveLoginStatus
}