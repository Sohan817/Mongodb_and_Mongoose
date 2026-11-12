require("dotenv").config();

let mongoose = require("mongoose");

let dbUri = process.env.MONGO_URI;

mongoose
  .connect(dbUri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error:", err));

//Scema
let personScema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favouriteFoods: [String],
});

//Model
let Person = mongoose.model("Person", personScema);

//Create and Save a Person

async function createSavePerson() {
  try {
    await Person.create({
      name: "John",
      age: 27,
      favouriteFoods: ["Pizza", "Burger"],
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    mongoose.disconnect();
  }
}

createSavePerson();

//OR
const user = new Person({ name: "Bob", email: "bob@example.com", age: 30 });
user.save();

//Create Many People with model.insertMany()

const arrayOfPeople = [
  { name: "Alice", age: 25, favouriteFoods: ["Pasta", "Salad"] },
  { name: "Bob", age: 30, favouriteFoods: ["Steak", "Fries"] },
  { name: "Charlie", age: 22, favouriteFoods: ["Sushi", "Ramen"] },
];

async function createManyPeople() {
  try {
    await Person.insertMany(arrayOfPeople);
  } catch (err) {
    console.log(err.message);
  } finally {
    mongoose.disconnect();
  }
}
createManyPeople();

// const createAndSavePerson = (done) => {
//   done(null /*, data*/);
// };

// const createManyPeople = (arrayOfPeople, done) => {
//   done(null /*, data*/);
// };

// const findPeopleByName = (personName, done) => {
//   done(null /*, data*/);
// };

// const findOneByFood = (food, done) => {
//   done(null /*, data*/);
// };

// const findPersonById = (personId, done) => {
//   done(null /*, data*/);
// };

// const findEditThenSave = (personId, done) => {
//   const foodToAdd = "hamburger";

//   done(null /*, data*/);
// };

// const findAndUpdate = (personName, done) => {
//   const ageToSet = 20;

//   done(null /*, data*/);
// };

// const removeById = (personId, done) => {
//   done(null /*, data*/);
// };

// const removeManyPeople = (done) => {
//   const nameToRemove = "Mary";

//   done(null /*, data*/);
// };

// const queryChain = (done) => {
//   const foodToSearch = "burrito";

//   done(null /*, data*/);
// };

// /** **Well Done !!**
// /* You completed these challenges, let's go celebrate !
//  */

// //----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

// exports.PersonModel = Person;
// exports.createAndSavePerson = createAndSavePerson;
// exports.findPeopleByName = findPeopleByName;
// exports.findOneByFood = findOneByFood;
// exports.findPersonById = findPersonById;
// exports.findEditThenSave = findEditThenSave;
// exports.findAndUpdate = findAndUpdate;
// exports.createManyPeople = createManyPeople;
// exports.removeById = removeById;
// exports.removeManyPeople = removeManyPeople;
// exports.queryChain = queryChain;
