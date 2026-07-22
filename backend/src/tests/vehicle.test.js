require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

let mongoServer;
let token;

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret";

  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Vehicle.deleteMany({});

  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "123456",
  });

  token = login.body.token;
});

describe("Vehicle API", () => {
  it("should create a vehicle", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

    expect(response.statusCode).toBe(201);
  });

  it("should get all vehicles", async () => {
  await Vehicle.create({
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 4500000,
    quantity: 5,
  });

  const response = await request(app)
    .get("/api/vehicles")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(1);
});
});