'use strict';

const logger = require('../lib/logger');
const Veggie = require('../model/veggie');
const storage = require('../lib/storage');

module.exports = function routeVeggie(router) {
  router.post('/api/veggie', (req, res) => {
    logger.log(logger.INFO, 'VEG-ROUTE: POST /api/veggie');

    try {
      const newVeggie = new Veggie(req.body.color, req.body.texture);
      console.log(newVeggie);
      storage.create('Veggie', newVeggie)
        .then((veggie) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(veggie));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-VEG: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request THIS OTHER ONE');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/veggie', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Veggie', req.url.query.id)
        .then((item) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(item));
          res.end();
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          // res.write('Resource not found');
          res.end();
          return undefined;
        });
    }
    storage.fetchAll('Veggie')
      .then((itemArray) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(itemArray));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });

  router.delete('/api/veggie', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }
    
    storage.delete('Veggie', req.url.query.id)
      .then((item) => {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.write('deleted', JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
