import request from 'supertest';
import server from '../src/index';

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
      expect(obj).toHaveProperty('_id');
      expect(obj).toHaveProperty('name');
      expect(obj).toHaveProperty('email');
      expect(obj).toHaveProperty('login');
      expect(obj).toHaveProperty('role');
    });
  });

  test("Get one by id", async () => {
    const res = await request(s).get("/getOne/648adc2fae29bc319b316646");
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty('_id');
    expect(obj).toHaveProperty('name');
    expect(obj).toHaveProperty('email');
    expect(obj).toHaveProperty('login');
    expect(obj).toHaveProperty('role');
  });

  test("Get one by error id", async () => {
    const res = await request(s).get("/getOne/648adc2fae29bc319b31664");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("User doesn't exist");
  });

  test("Get provile by login", async () => {
    const res = await request(s).get("/getByLogin/valik");
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj).toHaveProperty('_id');
    expect(obj).toHaveProperty('name');
    expect(obj).toHaveProperty('email');
    expect(obj).toHaveProperty('login');
    expect(obj).toHaveProperty('role');
  });

  test("Get one by error login", async () => {
    const res = await request(s).get("/getByLogin/vali");
    expect(res.status).toBe(400);
    const obj = res.body;
    expect(obj.error).toBe("User doesn't exist");
  });

  test("Update role", async () => {
    const newRole = 'owner';
    const login = 'valik';
    const payload = {event: "CHANGE_ROLE", data: {newRole, login}};
    const res = await request(s).post("/app-events").send({payload}).set('Accept', 'application/json');
    expect(res.status).toBe(200);
    const obj = res.body;
    expect(obj.login).toBe(login);
    expect(obj.newRole).toBe(newRole);
  });
});