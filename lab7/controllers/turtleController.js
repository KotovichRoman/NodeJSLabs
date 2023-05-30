const TurtlesService = require("../services/turtleService");

const turtlesService = new TurtlesService();

module.exports = {
  getAllTurtles: async (req, res, next) => {
    try {
      res.json(await turtlesService.getAllTurtles());
    } catch (error) {
      res.json("Error");
    }
  },

  getTurtleById: async (req, res, next) => {
    try {
      res.json(await turtlesService.getTurtleById(parseInt(req.params.id)));
    } catch (error) {
      res.json("Error");
    }
  },

  getTurtlesByFavoritePizza: async (req, res, next) => {
    try {
      res.json(
        await turtlesService.getTurtlesByFavoritePizza(req.query.favoritePizza)
      );
    } catch (error) {
      res.json("Error");
    }
  },

  createTurtle: async (req, res, next) => {
    try {
      res.json(await turtlesService.createTurtle(req.body));
    } catch (error) {
      res.json("Error");
    }
  },

  updateTurtleById: async (req, res, next) => {
    try {
      res.json(await turtlesService.updateTurtleById(req.body));
    } catch (error) {
      res.json("Error");
    }
  },

  deleteTurtleById: async (req, res, next) => {
    try {
      res.json(await turtlesService.deleteTurtleById(req.body));
    } catch (error) {
      res.json("Error");
    }
  },

  bindFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.bindFavoritePizza(req.body, false));
    } catch (error) {
      res.json("Error");
    }
  },

  bindSecondFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.bindFavoritePizza(req.body, true));
    } catch (error) {
      res.json("Error");
    }
  },

  unbindFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.unbindFavoritePizza(req.body, false));
    } catch (error) {
      res.json("Error");
    }
  },

  unbindSecondFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.unbindFavoritePizza(req.body, true));
    } catch (error) {
      res.json("Error");
    }
  },

  bindWeapon: async (req, res, next) => {
    try {
      res.json(await turtlesService.bindWeaponToTurtle(req.body));
    } catch (error) {
      res.json("Error");
    }
  },

  unbindWeapon: async (req, res, next) => {
    try {
      res.json(await turtlesService.unbindWeapon(req.body));
    } catch (error) {
      res.json("Error");
    }
  },

  uploadTurtleImage: async (req, res, next) => {
    try {
      res.json(await turtlesService.uploadTurtleImage(req.body));
    } catch (error) {
      res.status(400).json("Error");
    }
  },
};
