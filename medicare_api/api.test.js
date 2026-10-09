import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "./api/[...path].js";
import versionedHandler from "./api/v1/[endpoint].js";

function makeResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: undefined,
    ended: false,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

test("health endpoint returns an ok status", () => {
  const res = makeResponse();

  handler({ method: "GET", url: "/api/health", headers: {} }, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { status: "ok" });
});

test("configuration endpoint returns the settings required by the patient app", () => {
  const res = makeResponse();

  handler(
    {
      method: "GET",
      url: "/api/v1/get_configurations",
      headers: { origin: "http://localhost:5173" },
    },
    res
  );

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["Access-Control-Allow-Origin"], "http://localhost:5173");
  assert.ok(res.body.data.some((item) => item.id_name === "clinic_name"));
  assert.ok(
    res.body.data.some(
      (item) => item.id_name === "web_technical_issue_enable" && item.value === "false"
    )
  );
});

test("homepage collection endpoints return empty arrays", () => {
  const res = makeResponse();

  handler({ method: "GET", url: "/api/v1/get_city?active=1", headers: {} }, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.data, []);
});

test("preflight requests are accepted for an allowed origin", () => {
  const res = makeResponse();

  handler(
    {
      method: "OPTIONS",
      url: "/api/v1/get_configurations",
      headers: { origin: "http://localhost:5173" },
    },
    res
  );

  assert.equal(res.statusCode, 204);
  assert.equal(res.ended, true);
});

test("unknown origins are rejected", () => {
  const res = makeResponse();

  handler(
    {
      method: "GET",
      url: "/api/v1/get_configurations",
      headers: { origin: "https://untrusted.example" },
    },
    res
  );

  assert.equal(res.statusCode, 403);
});

test("versioned Vercel route serves the patient configuration endpoint", () => {
  const res = makeResponse();

  versionedHandler(
    {
      method: "GET",
      url: "/api/v1/get_configurations",
      headers: { origin: "http://localhost:5173" },
    },
    res
  );

  assert.equal(res.statusCode, 200);
  assert.ok(Array.isArray(res.body.data));
});