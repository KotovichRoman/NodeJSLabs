const express = require("express");
const pizzaController = require("../controllers/pizzaController");

module.exports = () => {
  let router = express.Router();

  router
    .route("/")
    .get((req, res, next) => {
      if (Object.keys(req.query).length === 0) {
        pizzaController.getAll(req, res, next);
      } else {
        next();
      }
    })
    .get(pizzaController.getPizzasByCalories)
    .post(pizzaController.createPizza)
    .put(pizzaController.updatePizzaById)
    .delete(pizzaController.deletePizzaById)
    .all((req, res, next) => res.error(new Error("gg")));

  router.route("/:id").get(pizzaController.getById);

  router
    .route("/superfat")
    .put(pizzaController.updateSuperFatPizzas)
    .all((req, res, next) => res.error(new Error("gg")));
  return router;
};
