const dbConnect = require("../config/db.config");
const useSeeder = require("./user.seeder");
const dotenv = require("dotenv");
dotenv.config();

dbConnect(() => {
  useSeeder();
});
