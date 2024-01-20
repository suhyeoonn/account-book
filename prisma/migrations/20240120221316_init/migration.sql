-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "AccountHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "type" INTEGER NOT NULL,
    "detail" TEXT,
    "category" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL
);
