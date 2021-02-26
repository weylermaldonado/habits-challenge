# Levantar el proyecto

Antes de levanatar el proyecto, cree un archivo `.env` basándose el archivo `.env.example`.

### Eventos

- Nombre: product-created
- Payload:
```JSON
 {
        "name": "test",
        "type": "prueba",
        "quantity": 32,
        "price": 5.5,
        "location": "mexico",
        "created_at": "2021-02-26T21:11:40.471Z",
        "id": "aKdvdtT66AnbzpIyFrUts"
  }
```

- Nombre: product-deleted
- Payload:
```JSON
 {
        "id": "aKdvdtT66AnbzpIyFrUts"
}
```

Usando docker compose
```bash
docker-compose up
```


# Documentación

## Estructura del proyecto

```
src
 |
 |___config
 |   |___ database
 |
 |___middlewares
 |  |___index.js
 |
 |___modules
 |  |___users //example
 |       |___dto
 |       |___user.resource.js
 |       |___user.controller.js
 |       |___user.service.js
 |       |___index.js
 |
 |___routes
 |  |___index.js
 |
 |___schemas
 |  |___seeders
 |  |___index.js
 |   
 |
 |___support
 |   |___index.js
 |
 |___index.js
 |___http-server.js
```
## Nomenclatura de archivos

Los archivos siempre deberán de tener la siguiente estructura en el nombramiento:

```
<nombre>.<tipo>.js
```
Donde:

- Nombre: Es el nombre del archivo siempre en minúscula.
- Tipo: Es la responsabilidad del archivo siempre en minúscula.

Ejemplos:

```
user.service.js
jwt.middleware.js
object.helper.js
validate-request.helper.js
```

> En caso de que el nombre del archivo requiera más de una palabra, se usará como separación **-** (guión medio).


## Módulos

Los módulos hacen referencia a los objetos de dominio del proyecto, estos deberán tener su propia carpeta dentro de la carpeta `modules` con un nombre en **plural**. Dentro de su propia carpeta, deberán tener:

- Servicios (service): Hacen referencia a la lógica de negocio propia del módulo y dependen de dependencias de terceros y/o un repositorio. 
- Controladores (controller): Exponen los casos de uso del objeto de dominio y dependen de los servicios.
- Recursos (resource): Son los endpoints propios del objeto de dominio y dependen de los controladores.
- Index: En este archivo, se deberán de hacer las respectivas inyecciones de dependencias.

## Configuración

En la carpeta de configuración (config) se deberán de crear las carpetas necesarios de las dependencias de infraestructura de la cual dependa el proyecto (Ej. base de datos, sistemas de cache, etc). Dentro de cada subcarpeta deberá detener su(s) archivos de configuración.

## Middlewares

En esta carpeta irán todos los middlewares que usarán los diferents módulos. Siempre tendrán que ser expuestos por medio de un archivo `index.js` para que pueda ser accedido como módulo.

## Rutas

En esta carpeta convergen los endpoints de los módulos dándoles un `path` base. De igual manera, estarán expuestas mediante un archivo `index.js` donde convergen los diferentes endpoints del proyecto.

Ejemplo de código:

```javascript
// api.routes.js

const router = require('express').Router();

const UserResources = require('../modules/users/user.resource.js');

router.use('/users', UserResources);

module.exports = router;
```

> _Nota:_ Aquí pueden coverger los middlewares o en su propio `resource` del dominio.

## Esquemas o modelos

En esta carpeta se deberán de encontrar los modelos o esquema de base de datos, de igual manera deberán de ser expuestos mediante un `index.js` para ser accedido por los módulos. De igual manera, de ser necesario, podrá contar con una subcarpeta de seeders.

### Respositorios

Dentro de la carpeta de modelos o esquemas, se deberán de encontrar los archivos `repositorio` de su respectivo esquema. Dentro de cada archivo deberá de tener funciones propias del ORM u ODM expuestas por una fachada.

Ejemplo de código

```javascript
// user.repository.js

const UserSchema = require('./user.schema.js');

/**
 * Create new user
 * @param {Object} user User data
 * @returns {Promise} User
 */
function store(user) {
  return new Promise((resolve, reject) => {
    UserSchema.create({
      full_name: user.fullName,
      email: user.email,
      user_name: user.username,
      password: user.password,
      created_at: new Date().toISOString(),
    })
        .then((user) => { return resolve(user); })
        .catch((error) => {
          if (error.code === 11000) {
            return reject(ErrorFactory.conflictError('The email or username already exists').toJSON());
          }
          return reject(ErrorFactory.queryError(error.message).toJSON());
        });
  });
}

module.exports = {
  store
};

```

## Soporte

En esta carpeta se encuentran todas las dependencias de terceros expuestas por fachadas en su respectiva subcarpeta. De igual manera, serán expuestas mediante un archivo `index.js`. 

## Manejo de errores

Puedes encontrar más información [aquí](https://bitbucket.org/dacodes/parrot-backend/src/master/src/support/errors/README.md)
