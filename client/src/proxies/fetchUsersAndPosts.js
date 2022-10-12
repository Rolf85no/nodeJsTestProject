export const fetchUsersAndPosts = async (url, requestOptions) => {
    return fetch(url, requestOptions)
        .then((response) => response.json())
}