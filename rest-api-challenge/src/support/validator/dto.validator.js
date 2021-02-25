const ErrorFactory = require('../errors/error.factory.js');

/**
 * Validate a request given a dto schema
 * @param {Object} schema Dto schema
 * @param {Object} request Express body object
 * @returns {Object} Error | Data
 */
function validateRequest(schema, request) {
    const isValid = schema.validate(request);

    if (isValid.error) {
        return ErrorFactory.badrequestError(isValid.error.details[0].message).toJSONResponse();
    }

    return isValid.value;
}

/**
 * Validate the whole express request object
 * and returns each relevant section mixed.
 * @param {Object} schema Dto schema
 * @param {Object} request Express body object
 * @returns {Object} Error | Data
 */
function fullValidate(schema, request) {
    const response = schema.validate(request, { allowUnknown: true });

    if (response.error) {
        return ErrorFactory.badrequestError(response.error.details[0].message).toJSONResponse();
    }

    const {
        body,
        query,
        params,
        auth,
        file,
        files,
        headers,
    } = response.value;


    return {
        queryData: () => { return { ...query }; },
        bodyData: () => { return { ...body }; },
        paramsData: () => { return { ...params }; },
        authData: () => { return { ...auth }; },
        fileData: () => { return { ...file }; },
        filesData: () => files,
        headersData: () => { return { ...headers }; },
        all: () => {
            return {
                bodyValues: { ...body },
                queryValues: { ...query },
                paramsValues: { ...params },
                authValues: { ...auth },
                fileValue: { ...file },
                filesValues: { ...files },
                headersValues: { ...headers },
            };
        },
    };
}

const queryStringToArray = ({ query }, ...keys) => keys.map((key) => {
    return query[key] ? { [key]: query[key].split(',') } : null;
})
    .reduce((p, c) => Object.assign(p, c), {});


module.exports = { validateRequest, fullValidate, queryStringToArray };
