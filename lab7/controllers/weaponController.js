const WeaponService = require("../services/weaponService");

const weaponService = new WeaponService();

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.json(await weaponService.getAll());
    } catch (error) {
      res.json("Error");
    }
  },

  getById: async (req, res, next) => {
    try {
      res.json(await weaponService.getById(req.params.id));
    } catch (error) {
      res.json("Error");
    }
  },

  getWeaponsByDps: async (req, res, next) => {
    try {
      res.json(await weaponService.getWeaponsByDps(req.query));
    } catch (error) {
      res.json("Error");
    }
  },

  createWeapon: async (req, res, next) => {
    try {
      const weaponData = req.body;
      res.json(await weaponService.createWeapon(weaponData));
    } catch (error) {
      res.json("Error");
    }
  },

  updateWeaponById: async (req, res, next) => {
    try {
      const weaponData = req.body;

      res.json(await weaponService.updateWeaponById(weaponData));
    } catch (error) {
      res.json("Error");
    }
  },

  deleteWeaponById: async (req, res, next) => {
    try {
      const weaponId = req.body.id;
      res.json(await weaponService.deleteWeaponById(weaponId));
    } catch (error) {
      res.json("Error");
    }
  },
};
