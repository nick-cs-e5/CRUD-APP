const API = 'http://localhost:3000';

export const createBranch = (branchBody) => {
    return fetch(`http://localhost:3000/create-branch`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-type" : 'application/json'
        },
        body: JSON.stringify(branchBody)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}

export const getAllBranch = () => {
    return fetch(`${API}/get-all-branch`, {
        method: "GET",
        headers: {
            accept: "application/json",
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}