import constants from './constants';

const getRequest = (url) => {
    return fetch(url);
}

const postRequest = (url, data) => {
    return fetch(url, {
        headers : {
            "Content-type" : "application/json;charset=utf-8"
        },
        method : "POST",
        body : JSON.stringify(data)
    });
}

export default {
    listProjects: async () => {
        let projects = await getRequest(constants.BASE_URL + constants.PROJECT_LIST_URL);
        let output = await projects.json();
        console.log("output : ", output);
        if (output && output.data && 
            output.status === 200 && 
            output.success) {
            return output.data;
        }
    },
    /**
     * Create projects 
     */
    createProjects : async (postData) => {
        let createURL = constants.BASE_URL + constants.CREATE_PROJECT_URL;
        let createOut = await postRequest(createURL, postData);
        let output = await createOut.json();
        console.log(output);
        if (output && output.message && 
            output.status === 200 && 
            output.success) {
            return output.data || {};
        }
    }
}