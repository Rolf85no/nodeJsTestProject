export const fetchUsersAndPosts = (requestOptions, url) => {
    return fetch(url, requestOptions)
        .then((response) => response.json())
}