const PizzaService = require("../services/pizzaService");

const pizzaService = new PizzaService();

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.json(await pizzaService.getAll());
    } catch (error) {
      res.json("Error");
    }
  },

  getById: async (req, res, next) => {
    try {
      res.json(await pizzaService.getById(req.params.id));
    } catch (error) {
      res.json("Error");
    }
  },

  getPizzasByCalories: async (req, res, next) => {
    try {
      res.json(await pizzaService.getPizzasByCalories(req.query));
    } catch (error) {
      res.json("Error");
    }
  },

  createPizza: async (req, res, next) => {
    try {
      const newPizza = req.body;
      res.json(await pizzaService.createPizza(newPizza));
    } catch (error) {
      res.json("Error");
    }
  },

  updatePizzaById: async (req, res, next) => {
    try {
      const pizzaData = req.body;

      res.json(await pizzaService.updatePizzaById(pizzaData));
    } catch (error) {
      res.json("Error");
    }
  },

  deletePizzaById: async (req, res, next) => {
    try {
      res.json(await pizzaService.deletePizzaById(req.body.pizzaId));
    } catch (error) {
      res.json("Error");
    }
  },

  updateSuperFatPizzas: async (req, res, next) => {
    try {
      res.json(await pizzaService.updateSuperFatPizzas());
    } catch (error) {
      res.json("Error");
    }
  },
};
