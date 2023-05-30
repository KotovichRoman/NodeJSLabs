const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class TurtleService {
  async getAllTurtles() {
    return prisma.turtles.findMany();
  }

  async getTurtleById(id) {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid id");
    }

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    return turtle;
  }

  async getTurtlesByFavoritePizza(pizzaName) {
    return await prisma.turtles.findMany({
      where: {
        OR: [
          { pizzas_turtles_favoritepizzaidTopizzas: { name: pizzaName } },
          { pizzas_turtles_secondfavoritepizzaidTopizzas: { name: pizzaName } },
      ],
      }
    })
  }

  async createTurtle(turtleData) {
    const {
      name,
      color,
      weaponId,
      favoritePizzaId,
      secondFavoritePizzaId,
      image,
    } = turtleData;

    if (!name || !color) {
      throw new Error("Name and color are required");
    }

    if (weaponId) {
      const weapon = await prisma.weapons.findUnique({
        where: {
          id: weaponId
        }
      });
33
      if (!weapon) {
        throw new Error("Invalid weaponId");
      }
    }

    if (favoritePizzaId) {
      const favoritePizza = await prisma.pizzas.findUnique({
        where: {
          id: favoritePizzaId
        }
      });

      if (!favoritePizza) {
        throw new Error("Invalid favoritePizzaId");
      }
    }

    if (secondFavoritePizzaId) {
      const secondFavoritePizza = prisma.pizzas.findUnique({
        where: {
          id: secondFavoritePizzaId
        }
      });

      if (!secondFavoritePizza) {
        throw new Error("Invalid secondFavoritePizzaId");
      }
    }

    const turtle = await prisma.turtles.create({
      data: {
        name: name,
        color: color,
        weaponid: weaponId,
        favoritepizzaid: favoritePizzaId,
        secondfavoritepizzaid: secondFavoritePizzaId,
        image: image
      }
    });

    return turtle;
  }

  async updateTurtleById(turtleData) {
    if (!Number.isInteger(turtleData.id)) {
      throw new Error("Invalid id");
    }

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: turtleData.id
      }
    });

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    const {
      name,
      color,
      weaponId,
      favoritePizzaId,
      secondFavoritePizzaId,
      image,
    } = turtleData;

    if (!name || !color) {
      throw new Error("Name and color are required");
    }

    if (weaponId) {
      const weapon = await prisma.weapons.findUnique({
        where: {
          id: weaponId
        }
      });

      if (!weapon) {
        throw new Error("Invalid weaponId");
      }
    }

    if (favoritePizzaId) {
      const favoritePizza = await prisma.pizzas.findUnique({
        where: {
          id: favoritePizzaId
        }
      });

      if (!favoritePizza) {
        throw new Error("Invalid favoritePizzaId");
      }
    }

    if (secondFavoritePizzaId) {
      const secondFavoritePizza = prisma.pizzas.findUnique({
        where: {
          id: secondFavoritePizzaId
        }
      });

      if (!secondFavoritePizza) {
        throw new Error("Invalid secondFavoritePizzaId");
      }
    }

    return await prisma.turtles.update({
      where: {
        id: turtleData.id
      },
      data: {
        name: name,
        color: color,
        weaponid: weaponId,
        favoritepizzaid: favoritePizzaId,
        secondfavoritepizzaid: secondFavoritePizzaId,
        image: image
      }
    });
  }

  async deleteTurtleById(turtleData) {
    if (!Number.isInteger(turtleData.id)) {
      throw new Error("Invalid id");
    }

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: turtleData.id
      }
    });

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    return await prisma.turtles.delete({
      where: {
        id: turtleData.id
      }
    });
  }

  async bindFavoritePizza (Data, isSecondFavorite) {
    const { turtleId, pizzaId } = Data;

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: turtleId
      }
    });

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    const pizza = await prisma.pizzas.findUnique({
      where: {
        id: pizzaId
      }
    });
    
    if (!pizza) {
      throw new Error("Pizza not found");
    }

    let resultTurtle;

    if (!isSecondFavorite) {
      resultTurtle = prisma.turtles.update({
        data: {
          favoritepizzaid: pizzaId
        },
        where: {
          id: turtleId
        }
      })
    } else {
      resultTurtle = prisma.turtles.update({
        data: {
          secondfavoritepizzaid: pizzaId
        },
        where: {
          id: turtleId
        }
      })
    }

    return resultTurtle;
  }

  async unbindFavoritePizza(Data, isSecondFavorite = false) {
    const { turtleId } = Data;

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: turtleId
      }
    });

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    let resultTurtle;

    if (!isSecondFavorite) {
      resultTurtle = prisma.turtles.update({
        data: {
          favoritepizzaid: null
        },
        where: {
          id: turtleId
        }
      })
    } else {
      resultTurtle = prisma.turtles.update({
        data: {
          secondfavoritepizzaid: null
        },
        where: {
          id: turtleId
        }
      })
    }

    return resultTurtle;
  }

  async bindWeaponToTurtle(data){
    const { turtleId, weaponId } = data;

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: turtleId
      }
    });

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    const weapon = await prisma.weapons.findUnique({
      where: {
        id: weaponId
      }
    });

    if (!weapon) {
      throw new Error("Weapon not found");
    }


    return await prisma.turtles.update({
      data: {
        weaponid: weaponId
      },
      where: {
        id: turtleId
      }
    })
  }

  async unbindWeapon(data) {
    const turtleId = data.turtleId;

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: turtleId
      }
    });

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    return await prisma.turtles.update({
      data: {
        weaponid: null
      },
      where: {
        id: turtleId
      }
    })
  }

  async uploadTurtleImage(data) {
    const turtleId = parseInt(data.turtleId);
    console.log(turtleId);
    console.log("log");

    const turtle = await prisma.turtles.findUnique({
      where: {
        id: turtleId
      }
    });

    console.log(turtleId);

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    console.log(turtle.id);

    const fileName = `images/turtle_${turtleId}.jpeg`;

    return await prisma.turtles.update({
      data: {
        image: fileName
      },
      where: {
        id: turtleId
      }
    });
  }
}

module.exports = TurtleService
