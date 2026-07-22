const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const User = require("../models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(201);

    const user = await User.findOne({
      email: "john@test.com",
    });

    expect(user).not.toBeNull();
  });

  it("should not register duplicate email", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(400);
  });

  it("should hash password before saving", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    const user = await User.findOne({
      email: "john@test.com",
    });

    expect(user.password).not.toBe("123456");
  });

  it("should login successfully with valid credentials", async () => {
    // Register first
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    // Login
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "john@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should reject invalid password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "john@test.com",
        password: "wrongpassword",
      });

    expect(response.statusCode).toBe(401);
  });

  it("should reject unknown email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "unknown@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(401);
  });
});