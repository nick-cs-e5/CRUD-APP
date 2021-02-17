const API = `http://localhost:3000`;


// POST Request to backend for creating Branch
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

// GET Request to backend for fetching all the branch informations
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

// GET Request to backend for getting the branch Information with unique Id
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

// PUT Request to backend for updating branch Information with unique Id
export const updateBranch = (branchId, branchbody) => {
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

// DELETE Request to backend for deleting Branch
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


