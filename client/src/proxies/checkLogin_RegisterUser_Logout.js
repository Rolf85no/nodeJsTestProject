export const checkLogin_RegisterUser_Logout = async (url, requestBody, methodType) => {
    const requestOptions =
        methodType === 'GET'
            ?
            {
                method: methodType,
                headers: { 'Content-type': 'application/json' },
            }
            :
            {
                method: methodType,
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(requestBody)
            }

    return fetch(url, requestOptions)
        .then((response) => response.json())

}