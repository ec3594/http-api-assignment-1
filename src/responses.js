const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

const respondXML = (request, response, status, content) => {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(content);
    response.end();
};

const writeXML = (object) => {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${object.message}</message>`;
    if (object.id) {
        responseXML = `${responseXML}<id>${object.id}</id>`;
    }
    responseXML = `${responseXML}</response>`;
    return responseXML;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function to show a success status code
const success = (request, response, acceptedTypes) => {
    //response to send
    const successRes = {
        message: 'This is a successful response.',
    };

    // send xml
    if (acceptedTypes[0] === 'text/xml') {
        return respondXML(request, response, 200, writeXML(successRes));
    }

    // send json
    return respondJSON(request, response, 200, successRes);
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function to show a badRequest status code
const badRequest = (request, response, acceptedTypes, params) => {
    // response 1
    const badRequestRes = {
        message: 'This request has the required parameters.',
    };
    // response 2
    const badRequestMissingRes = {
        message: 'Missing valid query parameter set to true',
        id: 'badRequest',
    };

    //if the request does not contain a valid=true query parameter, send response 2
    if (!params.valid || params.valid !== 'true') {
        // send xml
        if (acceptedTypes[0] === 'text/xml') {
            return respondXML(request, response, 400, writeXML(badRequestMissingRes));
        }
        // send json
        return respondJSON(request, response, 400, badRequestMissingRes);
    }

    // otherwise, send response 1
    // send xml
    if (acceptedTypes[0] === 'text/xml') {
        return respondXML(request, response, 200, writeXML(badRequestRes));
    }
    // send json
    return respondJSON(request, response, 200, badRequestRes);
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function to show a unauthorized status code
const unauthorized = (request, response, acceptedTypes, params) => {
    // response 1
    const unauthorizedRes = {
        message: 'You have successfully viewed the content.',
    };
    // response 2
    const unauthorizedMissingRes = {
        message: 'Missing loggedIn query parameter set to yes',
        id: 'unauthorized',
    };

    //if the request does not contain a loggedIn=yes query parameter, send response 2
    if (!params.loggedIn || params.loggedIn !== 'yes') {
        // send xml
        if (acceptedTypes[0] === 'text/xml') {
            return respondXML(request, response, 401, writeXML(unauthorizedMissingRes));
        }
        // send json
        return respondJSON(request, response, 401, unauthorizedMissingRes);
    }

    // otherwise, send response 1
    // send xml
    if (acceptedTypes[0] === 'text/xml') {
        return respondXML(request, response, 200, writeXML(unauthorizedRes));
    }
    // send json
    return respondJSON(request, response, 200, unauthorizedRes);
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function to show a forbidden status code
const forbidden = (request, response, acceptedTypes) => {
    //response to send
    const forbiddenRes = {
        message: 'You do not have access to this content.',
        id: 'forbidden',
    };

    // send xml
    if (acceptedTypes[0] === 'text/xml') {
        return respondXML(request, response, 403, writeXML(forbiddenRes));
    }

    // send json
    return respondJSON(request, response, 403, forbiddenRes);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function to show a internal status code
const internal = (request, response, acceptedTypes) => {
    //response to send
    const internalRes = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'internal',
    };

    // send xml
    if (acceptedTypes[0] === 'text/xml') {
        return respondXML(request, response, 500, writeXML(internalRes));
    }

    // send json
    return respondJSON(request, response, 500, internalRes);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function to show a notImplemented status code
const notImplemented = (request, response, acceptedTypes) => {
    //response to send
    const notImplementedRes = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
        id: 'notImplemented',
    };


    // send xml
    if (acceptedTypes[0] === 'text/xml') {
        return respondXML(request, response, 501, writeXML(notImplementedRes));
    }

    // send json
    return respondJSON(request, response, 501, notImplementedRes);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function to show a notFound status code
const notFound = (request, response, acceptedTypes) => {
    //response to send
    const notFoundRes = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    // send xml
    if (acceptedTypes[0] === 'text/xml') {
        return respondXML(request, response, 404, writeXML(notFoundRes));
    }

    // send json
    return respondJSON(request, response, 404, notFoundRes);
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};