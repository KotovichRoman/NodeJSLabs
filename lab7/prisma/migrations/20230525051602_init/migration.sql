-- CreateTable
CREATE TABLE "pizzas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "calories" DOUBLE PRECISION,

    CONSTRAINT "pizzas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turtles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "color" VARCHAR(255),
    "weaponid" INTEGER,
    "favoritepizzaid" INTEGER,
    "secondfavoritepizzaid" INTEGER,
    "image" VARCHAR(255),

    CONSTRAINT "turtles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "dps" INTEGER,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "turtles" ADD CONSTRAINT "turtles_favoritepizzaid_fkey" FOREIGN KEY ("favoritepizzaid") REFERENCES "pizzas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "turtles" ADD CONSTRAINT "turtles_secondfavoritepizzaid_fkey" FOREIGN KEY ("secondfavoritepizzaid") REFERENCES "pizzas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "turtles" ADD CONSTRAINT "turtles_weaponid_fkey" FOREIGN KEY ("weaponid") REFERENCES "weapons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
