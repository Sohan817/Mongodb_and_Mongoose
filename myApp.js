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

//createSavePerson();

//OR
const user = new Person({ name: "Bob", email: "bob@example.com", age: 30 });
//user.save();

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
//createManyPeople();

//Find data from the database with model.find()
async function findPeopleByNameAge(name, age) {
  try {
    const data = await Person.find({ name: name, age: age });
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

//findPeopleByNameAge("John", 26);

//Find one person by favourite food with model.findOne()
async function findOnePersonByFavouriteFood(food) {
  try {
    const data = await Person.findOne({ favouriteFoods: { $all: [food] } });
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

//findOnePersonByFavouriteFood("pizza", "Burger");

//find a person by ID with model.findById()
async function findPersonById(id) {
  try {
    const data = await Person.findById(id);
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

//findPersonById("6af5d0f944a66f9307f37374");

//Update record
async function updatePerson(id, newAge, newFood) {
  try {
    const data = await Person.findOne({ _id: id });
    data.age = newAge;
    data.favouriteFoods.push(newFood);
    await data.save();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

//updatePerson("6af5d0f944a66f9307f37374", 28, "Ice Cream");

//Update a record using model.findOneAndUpdate()
async function updatePersonByFindOneAndUpdate(name, newAge) {
  try {
    const data = await Person.findOneAndUpdate(
      { name: name },
      { age: newAge },
      { new: true },
    );
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
//updatePersonByFindOneAndUpdate("John", 29);

//Update a record using model.findByIdAndUpdate()
async function updatePersonByFindByIdAndUpdate(id, newAge) {
  try {
    const data = await Person.findByIdAndUpdate(
      id,
      { age: newAge },
      { new: true },
    );
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
//updatePersonByFindByIdAndUpdate("6af5d0f944a66f9307f37376", 29);

//Remove a record using model.findOneAndRemove()
async function removePerson(name) {
  try {
    const data = await Person.findOneAndDelete({ name: name });
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
removePerson("John");
