import mongoose from "mongoose";
import request from "supertest";
import { describe, it, expect } from "vitest";
import createApp from "./app.js";

const mockURL =
  "mongodb+srv://brainhub:SM8M7jyc9-UPT8M@bigbadcluster.2sp4mjp.mongodb.net/testlogs?retryWrites=true&w=majority";

const app = createApp();
mongoose.set("strictQuery", false).connect(mockURL);

describe("POST /api/logs", () => {
  describe("should not accept invalid data", async () => {
    it("should respond with a 400 status code", async () => {
      const response = await createResponse(
        "Johnny Test",
        "johnny@test.com",
        "invalidline"
      );
      expect(response.statusCode).toBe(400);
    });
    it("should respond with 422 status code", async () => {
      const response = await createResponse(
        "Johnny Test",
        "invalidmail.com",
        "I 23 validline"
      );
      expect(response.statusCode).toBe(422);
    });
  });

  describe("should accept valid data", async () => {
    it("should respond with 201 status code", async () => {
      const response = await createResponse(
        "Johnny Test",
        "johnny@test.com",
        "I 23 validline"
      );
      expect(response.statusCode).toBe(201);
    });
    it("should specify json in the content type header", async () => {
      const response = await createResponse(
        "Johnny Test",
        "johnny@test.com",
        "I 23 validline"
      );
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});

const createResponse = async (name, email, log) => {
  return await request(app).post("/api/logs").send({
    name,
    email,
    log,
  });
};
