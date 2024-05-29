import request from "supertest";
import server from "../src/index";

const TOKEN =
  "075e52c9fa96f4e5529acfab1cac33bd19bdabd3fcd32ceb14f417723a0d8f37";

describe("Test user service", () => {
  let s: any;

  beforeAll(async () => {
    s = await server;
  });

  afterAll(async () => {
    if (s) {
      s.close();
    }
  });

  test("Get all users", async () => {
    const res = await request(s).get("/");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((obj: any) => {
      expect(obj).toHaveProperty("_id");
      expect(obj).toHaveProperty("name");
      expect(obj).toHaveProperty("email");
      expect(obj).toHaveProperty("login");
      expect(obj).toHaveProperty("role");
    });
  });

  test("Get one by id", async () => {
    const res = await request(s).get("/getOne/648adc2fae29bc319b316646");
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty("_id");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("email");
    expect(obj).toHaveProperty("login");
    expect(obj).toHaveProperty("role");
  });

  test("Get one by error id", async () => {
    const res = await request(s).get("/getOne/648adc2fae29bc319b31664");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("User doesn't exist");
  });

  test("Get profile by login", async () => {
    const res = await request(s).get("/getByLogin/valik");
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty("_id");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("email");
    expect(obj).toHaveProperty("login");
    expect(obj).toHaveProperty("role");
  });

  test("Get one by error login", async () => {
    const res = await request(s).get("/getByLogin/vali");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("User doesn't exist");
  });

  test("Update role", async () => {
    const newRole = "owner";
    const login = "valik";
    const payload = { event: "CHANGE_ROLE", data: { newRole, login } };
    const res = await request(s)
      .post("/app-events")
      .send({ payload })
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj.login).toBe(login);
    expect(obj.newRole).toBe(newRole);
  });

  test("Update wrong user's role", async () => {
    const newRole = "owner";
    const login = "vali";
    const payload = { event: "CHANGE_ROLE", data: { newRole, login } };
    const res = await request(s)
      .post("/app-events")
      .send({ payload })
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("User doesn't exist");
  });

  test("Get profile by token", async () => {
    const payload = { event: "GET_PROFILE_BY_TOKEN", data: { token: TOKEN } };
    const res = await request(s)
      .post("/app-events")
      .send({ payload })
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty("_id");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("email");
    expect(obj).toHaveProperty("login");
    expect(obj).toHaveProperty("role");
  });

  test("Get profile by wrong token", async () => {
    const payload = {
      event: "GET_PROFILE_BY_TOKEN",
      data: { token: TOKEN.slice(10) },
    };
    const res = await request(s)
      .post("/app-events")
      .send({ payload })
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("User session doesn't exist");
  });

  test("Get me", async () => {
    const res = await request(s)
      .get("/me")
      .set("Cookie", `COOKIE_AUTH=${TOKEN}`);
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty("_id");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("email");
    expect(obj).toHaveProperty("login");
    expect(obj).toHaveProperty("role");
  });

  test("Get me unauth", async () => {
    const res = await request(s)
      .get("/me")
      .set("Cookie", `COOKIE_AUTH=${TOKEN.slice(10)}`);
    expect(res.status).toBe(403);
    const obj = res.body;
    expect(obj.error).toBe("You are not logged in.");
  });

  test("Logout unauth", async () => {
    const res = await request(s).post("/logout");
    expect(res.status).toBe(403);
    const obj = res.body;
    expect(obj.error).toBe("You are not logged in.");
  });

  test("Register not email", async () => {
    const payload = {
      email: "qwsdfv",
    };
    const res = await request(s)
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("Invalid email");
  });

  test("Register small password", async () => {
    const payload = {
      email: "q@gmail.com",
      password: "1",
    };
    const res = await request(s)
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("Password should contain at least 8 symbols");
  });

  test("Register not all fields", async () => {
    const payload = {
      email: "q@gmail.com",
      password: "12345678",
      login: "vel",
    };
    const res = await request(s)
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("All fields should be filled");
  });

  test("Register success", async () => {
    const payload = {
      email: "q@gmail.com",
      password: "12345678",
      login: "vel",
      name: "Valik",
    };
    const res = await request(s)
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty("_id");
    expect(obj).toHaveProperty("email");
    expect(obj).toHaveProperty("login");
    expect(obj).toHaveProperty("role");
  });

  test("Register double error", async () => {
    const payload = {
      email: "q@gmail.com",
      password: "12345678",
      login: "vel",
      name: "Valik",
    };
    const res = await request(s)
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("User with this email/login alredy registered");
  });

  test("Login no password", async () => {
    const payload = {
      email: "vel",
    };
    const res = await request(s)
      .post("/login")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("Wrong login, email or password");
  });

  test("Login wrong email", async () => {
    const payload = {
      email: "vel",
      password: "12345678",
    };
    const res = await request(s)
      .post("/login")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("Wrong login, email or password");
  });

  test("Login wrong password", async () => {
    const payload = {
      login: "vel",
      password: "1234567",
    };
    const res = await request(s)
      .post("/login")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("Wrong login, email or password");
  });

  test("Login success", async () => {
    const payload = {
      login: "vel",
      password: "12345678",
    };
    const res = await request(s)
      .post("/login")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
  });

  test("Change password wrong old", async () => {
    const payload = {
      oldPassword: "12345678910",
      newPassword: "12345678",
      repeatPassword: "12345678",
    };
    const res = await request(s)
      .put("/changePassword")
      .send(payload)
      .set("Accept", "application/json")
      .set("Cookie", `COOKIE_AUTH=${TOKEN}`);
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("Wrong old password");
  });

  test("Change password don't match", async () => {
    const payload = {
      oldPassword: "123456789",
      newPassword: "12345678",
      repeatPassword: "123456789",
    };
    const res = await request(s)
      .put("/changePassword")
      .send(payload)
      .set("Accept", "application/json")
      .set("Cookie", `COOKIE_AUTH=${TOKEN}`);
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("Passwords do not match");
  });

  test("Change password unauth", async () => {
    const payload = {
      oldPassword: "123456789",
      newPassword: "12345678",
      repeatPassword: "12345678",
    };
    const res = await request(s)
      .put("/changePassword")
      .send(payload)
      .set("Accept", "application/json")
      .set("Cookie", `COOKIE_AUTH=${TOKEN.slice(10)}`);
    expect(res.status).toBe(403);
    const obj = res.body;
    expect(obj.error).toBe("You are not logged in.");
  });

  test("Change password success", async () => {
    const payload = {
      oldPassword: "123456789",
      newPassword: "12345678",
      repeatPassword: "12345678",
    };
    const res = await request(s)
      .put("/changePassword")
      .send(payload)
      .set("Accept", "application/json")
      .set("Cookie", `COOKIE_AUTH=${TOKEN}`);
    expect(res.status).toBe(200);
  });

  test("Logout", async () => {
    const res = await request(s)
      .post("/logout")
      .set("Cookie", `COOKIE_AUTH=${TOKEN}`);
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty("success");
  });
});
