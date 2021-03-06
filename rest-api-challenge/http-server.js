const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const { Logger } = require('./src/support');
const logger = new Logger('HttpServer');
const socket = require('socket.io');
const httpSS = require('http');

/**
 * HttpServer
 */
class HttpServer {
  /**
   * Constructor
   * @param {Object} router Express router
   * @param {Number} port Port number
   */
  constructor(router, port) {
    this.app = express();
    this.socketServer = httpSS.Server(this.app);
    this.port = port || 3000;
    this.host = process.env.HOST || '0.0.0.0';
    this.router = router;

    this.initConfig();
  }
  /**
   * Run the server
   */
  listen() {
    const server = this.socketServer.listen(this.port, this.host, () => {
      logger.debug(`API running in port: ${this.port}`);
    });
    return server;

  }
  /**
   * Set the io as global module and set up the server.
   * @param {Object} server Server instance 
   * @returns {void}
   */
  setupSocketServer(server) {
    const io = socket(server, {
      cors: {
        origin: '*'
      }
    });
    io.on('connection', (sock) => {
      logger.debug('Socket server listening.')
    });
    this.app.set('socketio', io);
  }
}

/**
 * Initialize the middleware.
 */
function initializeMiddlewares() {
  this.app.use(express.urlencoded({ extended: true }));
  this.app.use(express.json());
  this.app.use(morgan('dev'));
  this.app.use(helmet());
  this.app.use(compression());
  this.app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({
        error: {
          type: 'UnprocessableEntity',
          status: 400,
          message: 'Malformed JSON',
          code: 100,
        },
      });
    }

    next();
  });
  this.app.use(cors({
    origin: '*',
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
    ], allowedHeaders: ['Content-Type', 'Authorization'],
  }),
  );
}

/**
 * Set the route files.
 */
function initializeRouter() {
  const routes = this.router;
  for (const route in routes) {
    if (routes.hasOwnProperty(route)) {
      const element = routes[route];
      this.app.use(element);
    }
  }
}

HttpServer.prototype.initConfig = function () {
  initializeMiddlewares.call(this);
  initializeRouter.call(this);
};

module.exports = { HttpServer };
