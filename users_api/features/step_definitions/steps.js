const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai'); 
const axios = require('axios');

let jwtToken = null;

Given('the API is up and running', async function () {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/');
        if (response.status !== 200) {
            throw new Error('API is not responding correctly');
        }
    } catch (error) {
        throw new Error(`Error connecting to the API: ${error.message}`);
    }
});

Given('a valid user ID', function () {
    const test_id = 1;
    this.test_id = test_id;
    return test_id;
});

Given('a valid user object', function () {
    const test_user = {
        "name": "Test user",
        "dni": "qa843483",
        "email": "user@first-test.com",
        "password": "passwordtest"
    }

    this.test_user = test_user;
    return test_user;
});

Given('an existing email', function () {
    const test_email = 'user@test.com';
    this.test_email = test_email;
    return test_email;
});

Given('a valid password', function () {
    const test_password = 'passwordtest';
    this.test_password = test_password;
    return test_password;
});

Given('a new password', function () {
    const test_password = 'newpasswordtest';
    this.test_new_password = test_password;
    return test_password;
});

When('a GET request is made to {string}', async function (endpoint) {
    const response = await makeGETRequest(endpoint, this.test_id);
    this.responseStatusCode = response.status;
    this.responseBody = response.body;
});

When('a POST request is made to {string}', async function (endpoint) {
    let data;

    if(this.test_user) data = this.test_user;
    else if(this.test_email && this.test_password) {
        data = {
            "email": `${this.test_email}`,
            "password": `${this.test_password}`
        } 
    } 
    else {
        data = {
            "email": `${this.test_email}`
        } 
    }

    const response = await makePOSTRequest(endpoint, data);
    this.responseStatusCode = response.status;
    this.responseBody = response.body;
});

When('a PUT request is made to {string}', async function (endpoint) {
    const id = this.test_id;
    const data = this.test_user;
    data.dni = '001001';
    data.email = 'user@test.com';

    const response = await makePUTRequest(endpoint, id, data);
    this.responseStatusCode = response.status;
    this.responseBody = response.body;
});

When('a PATCH request is made to {string}', async function (endpoint) {
    const data = {
        "email": `${this.test_email}`,
        "newPassword": `${this.test_new_password}`
    }; 

    const response = await makePATCHRequest(endpoint, data);
    this.responseStatusCode = response.status;
    this.responseBody = response.body;
});

When('a DELETE request is made to {string}', async function (endpoint) {
    const response = await makeDELETERequest(endpoint, this.test_id);
    this.responseStatusCode = response.status;
    this.responseBody = response.body;
});

Then('the response status code should be {int}', function (expectedStatusCode) {
    expect(this.responseStatusCode).to.equal(expectedStatusCode);
});

Then('the response body should contain only {string}', function (expectedString) {
    expect(this.responseBody).to.include(expectedString);
});

Then('the response body should contain {string}', function (expectedString) {
    expect(this.responseBody).to.have.property('message');
    expect(this.responseBody.message).to.equal(expectedString);
});

Then('the response body should contain a list of users', function () {
    expect(this.responseBody.data).to.be.an('array');
});

Then('the response body should contain user details', function () {
    expect(this.responseBody).to.be.an('object');

});

Then('the response body should contain an authentication token', function () {
    const responseBody = this.responseBody;
    
    expect(this.responseBody).to.have.property('token');
    expect(this.responseBody.token).to.be.a('string'); 
});


async function makeGETRequest(endpoint, id = null) {
    try {
        const url = id ? `http://localhost:3000${endpoint}/${id}` : `http://localhost:3000${endpoint}`;
        const response = await axios.get(url);
        return {
            status: response.status,
            body: response.data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            body: error.response ? error.response.data : 'Error connecting to the API'
        };
    }
}

async function makePOSTRequest(endpoint, data) {
    try {
        const response = await axios.post(`http://localhost:3000${endpoint}`, data);
        return {
            status: response.status,
            body: response.data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            body: error.response ? error.response.data : 'Error connecting to the API'
        };
    }
}

async function makePUTRequest(endpoint, id = null, data) {
    try {
        const url = id ? `http://localhost:3000${endpoint}/${id}` : `http://localhost:3000${endpoint}`;
        const response = await axios.put(url, data);
        return {
            status: response.status,
            body: response.data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            body: error.response ? error.response.data : 'Error connecting to the API'
        };
    }
}

async function makePATCHRequest(endpoint, data) {
    try {
        const response = await axios.post(`http://localhost:3000${endpoint}`, data);
        return {
            status: response.status,
            body: response.data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            body: error.response ? error.response.data : 'Error connecting to the API'
        };
    }
}

async function makeDELETERequest(endpoint, id = null) {
    try {
        const url = id ? `http://localhost:3000${endpoint}/${id}` : `http://localhost:3000${endpoint}`;
        const response = await axios.delete(url);
        return {
            status: response.status,
            body: response.data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            body: error.response ? error.response.data : 'Error connecting to the API'
        };
    }
}
