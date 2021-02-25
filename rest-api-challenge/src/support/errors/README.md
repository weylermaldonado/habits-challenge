# Error handling

## Add new error type

Create the subclass and extend from de base class `ApplicationError`:

``` javascript
const ApplicationError = require('./application.error.js');
/**
 * Third part dependecy error
 */
class TestError extends ApplicationError {
  /**
   * Default error
   * @param {String} message Error message
   * @param {Number} status HTTP Status
   * @param {Number} code Application specific code
   */
  constructor(message, status, code) {
    super(message, status, code);
  }
}

module.exports = TestError;
```

The name file should be the patter:

```
<errorname>.error.js
```

If the the name have more than one word, use hyphen:

```
<error-name>.error.js
```
Then register the metadata in the `code.v2.json` file:

```json
"testerror": { #The key should be always in lower case and the salt word should be error and all together
        "slug": "permission", # optional
        "status": 509,
        "code": 7011,
        "description": "Test description" # optional
    }
```

## Usage

To use any error in the `errors` folder, should be invoked by this pattern:

```
<errorName>: alway in lower case without any separation
<Error>: Error always at the end and the first char capitalize
```

Example:

```javascript
const ErrorFactory = require('./support/errors/error.factory.js')

ErrorFactory.unauthorizedError('message');

// Name with more than one word

ErrorFactory.inactivesessionError('message');
```

### Methods

- `toJSON()`: Retorna la instacia de error en el siguiente formato.

```javascript
{
  status: <number>,
  data: {
    error: {
      name: <string>,
      message: <string>,
      status: <number>,
      code: <number>,
    }
  }
}
```

- `toJSONResponse()`: Retorna la información de error en el siguiente formato.

```javascript
{
  error: {
      name: <string>,
      message: <string>,
      status: <number>,
      code: <number>,
  }
}
```