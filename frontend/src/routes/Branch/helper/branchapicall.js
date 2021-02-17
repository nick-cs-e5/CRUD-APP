const API = `http://localhost:3000`;

export const createBranch = (branchBody) => {
    return fetch(`${API}/create-branch`, {
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
            accept: "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}


export const getBranch = (branchId) => {
    return fetch(`${API}/get-branch/${branchId}`, {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}


export const updateBranch = (branchId, branchbody) => {
  //  console.log(branchId)
    return fetch(`${API}/update-branch/${branchId}`, {
        method: "PUT",
        headers: {
            accept: "application/json",
            "Content-type" : "application/json"
        },
        body : JSON.stringify(branchbody)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}


export const deleteBranch = (branchId) => {
    return fetch(`${API}/delete-branch/${branchId}`, {
        method: "DELETE",
        headers: {
            accept: "application/json",
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}


