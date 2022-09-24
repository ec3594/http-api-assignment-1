const http = require('http'); //pull in the http server module
const url = require('url'); //pull in the url module
//pull in the query string module
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

//set the port. process.env.PORT and NODE_PORT are for servers like heroku
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
    //parse the url using the url module
    //This will let us grab any section of the URL by name
    const parsedUrl = url.parse(request.url);

    //grab the query parameters (?key=value&key2=value2&etc=etc)
    //and parse them into a reusable object by field name
    const params = query.parse(parsedUrl.query);

    const acceptedTypes = request.headers.accept.split(',');

    //check if the path name (the /name part of the url) matches 
    //any in our url object. If so call that function. If not, default to index.
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
    } else {
        urlStruct.notFound(request, response, acceptedTypes, params);
    }
};

//start HTTP server 
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);