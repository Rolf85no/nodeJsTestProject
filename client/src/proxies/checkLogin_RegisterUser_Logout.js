export const checkLogin_RegisterUser_Logout = (requestOptions, url) => {
    return fetch(url, requestOptions)
        .then((response) => response.json())

}