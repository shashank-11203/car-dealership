const User = require("../models/User");

it("should register a new user", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "John",
      email: "john@test.com",
      password: "123456",
    });

  expect(response.statusCode).toBe(201);

  const user = await User.findOne({ email: "john@test.com" });

  expect(user).not.toBeNull();
});