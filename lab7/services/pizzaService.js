const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class PizzaService {
  async getAll() {
    return await prisma.pizzas.findMany();
  }

  async getById(pizzaId) {
    const pizza = await prisma.pizzas.findUnique({
      where: {
        id: parseInt(pizzaId)
      }
    });
    if (!pizza) throw new Error("Pizza does not exist");

    return pizza;
  }

  async getPizzasByCalories(queryData) {
    const { calories } = queryData;
    const caloriesNum = parseFloat(calories.slice(2));
    let pizzas;

    if (!caloriesNum) {
      throw new Error("Please provide calories");
    }

    if (calories.startsWith("gt")) {
      pizzas = prisma.pizzas.findMany({
        where: {
          calories: {
            gt: parseFloat(caloriesNum)
          }
        }
      })
    } else {
      pizzas = prisma.pizzas.findMany({
        where: {
          calories: {
            lt: parseFloat(caloriesNum)
          }
        }
      })
    }

    return pizzas;
  }

  async createPizza(data) {
    const { pizzaName, pizzaCalories } = data;

    if (!pizzaName || !pizzaCalories) {
      throw new Error("Name and calories are required");
    }

    if (pizzaCalories > 2000) {
      throw new Error("Calories must not exceed 2000");
    }

    return await prisma.pizzas.create({
      data: {
        name: pizzaName,
        calories: parseFloat(pizzaCalories)
      }
    });
  }

  async updatePizzaById(pizzaData) {
    const { pizzaId, pizzaName, pizzaCalories } = pizzaData;

    const pizza = await prisma.pizzas.findUnique({
      where: {
        id: parseInt(pizzaId)
      }
    });

    if (!pizza) {
      throw new Error("Pizza not found");
    }

    return await prisma.pizzas.update({
      where: {
        id: pizzaId
      },
      data: {
        name: pizzaName,
        calories: parseFloat(pizzaCalories)
      }
    });
  }

  async deletePizzaById(pizzaId) {
    const pizza = await prisma.pizzas.findUnique({
      where: {
        id: parseInt(pizzaId)
      }
    });

    if (!pizza) {
      throw new Error("Pizza not found");
    }

    return prisma.pizzas.delete({
      where: {
        id: pizzaId
      }
    });
  }

  async updateSuperFatPizzas() {
    const [returnPizzas] = await prisma.$transaction([
      prisma.pizzas.updateMany({
        data: {
          name: "super fat"
        },
        where: {
          calories: {
            gt: 1500
          }
        }
      }),
    ])

    return returnPizzas;
  }
}

module.exports = PizzaService
