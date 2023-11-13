export const api = (
    path, 
    method = "GET",
    body = null,
    credentials = null
    ) => {
    const url = `http://localhost:5000/api` + path;

    const options = {
        method,
        headers: {},
    }

    if (body) {
        options.body = JSON.stringify(body);
        // bracket notation needed because Content-Type is a string
        options.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    if (credentials){
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password }`);

        options.headers["Authorization"] = `Basic ${encodedCredentials}`
    }

    return fetch (url, options);

};


/// USED THE BELOW EXAMPLES OF EXISTING CODE AS REFERENCE TO HOW TO CREATE THE API HELPER FUNCTION



/* CREATE USER 

// Defining options to pass to the fectch method
const fetchOptions = {
    // To add new user, method is POST
    method: "POST",
    // In case HTTP server needs it, we're defining the body type via a content type request header...
    headers: {
      // which lets the server know the body type is json with character encoding utf-8
      "Content-Type": "application/json; charset=utf-8"
    },
    // send user's info in the body property and ensure it's a string object with JSON.stringify()
    body: JSON.stringify(user),
  };

  // to catch errors when using async/await, we need a try/catch block
  try {
    const response = await fetch("http://localhost:5000/api/users", fetchOptions);

*/


/* GET AUTH USER 

   const encodedCredentials = btoa(`${credentials.username}:${credentials.password }`);

    const fecthOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      },
    }


    const response = await fetch("http://localhost:5000/api/users", fecthOptions);
    */

