const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class WeaponService {
  async getAll() {
    return prisma.weapons.findMany();
  }

  async getById(id) {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid id");
    }

    const weapon = await prisma.weapons.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!weapon) {
      throw new Error("Turtle not found");
    }

    return weapon;
  }

  async getWeaponsByDps(data) {
    const { dps } = data;
    const dpsNum = parseInt(dps.slice(2));
    let weapons;
    console.log(dps);
    if (!dps) {
      throw new Error("Please provide dps");
    }

    if (dps.startsWith("gt")) {
      weapons = prisma.weapons.findMany({
        where: {
          dps: {
            gt: dpsNum
          }
        }
      })
    } else {
      weapons = prisma.weapons.findMany({
        where: {
          dps: {
            lt: dpsNum
          }
        }
      })
    }

    return weapons;
  }

  async createWeapon(weaponData) {
    const { name, dps } = weaponData;

    if (!name || !dps) {
      throw new Error("Name and dps are required");
    }

    if (dps > 500) {
      throw new Error("Dps must not exceed 500");
    }

    return await prisma.weapons.create({
      data: {
        name: name,
        dps: dps
      }
    });
  }

  async updateWeaponById (weaponData) {
    const { id, name, dps } = weaponData;

    const weapon = await prisma.weapons.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!weapon) {
      throw new Error("Weapon not found");
    }

    if (dps > 500) {
      throw new Error("Dps must not exceed 500");
    }

    return await prisma.weapons.update({
      where: {
        id: id
      },
      data: {
        name: name,
        dps: dps
      }
    });
  }

  async deleteWeaponById(id) {
    const weapon = await prisma.weapons.findUnique({
      where: {
        id: id
      }
    });

    if (!weapon) {
      throw new Error("Weapon not found");
    }

    return prisma.weapons.delete({
      where: {
        id: id
      }
    });
  }
}

module.exports = WeaponService
