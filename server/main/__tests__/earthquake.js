const request = require("supertest");
const app = require("../app");
const { EarthquakeEvent, EarthquakeReport } = require("../models");
const access_token = "qwerdstucbsugygwwwqpourtOpsu";

const fs = require("fs");

beforeAll(async () => {
  try {
    console.log("halo");
    const earthQuake = await JSON.parse(
      fs.readFileSync("./db/eventsEarthquake.json", "utf-8")
    );

    await EarthquakeEvent.bulkCreate(earthQuake);
    console.log("apakah ke create?");
  } catch (err) {
    console.log(err);
  }
});

const report = {
  UserId: 1,
  EventquakeId: 1,
  status: "Safe",
  description: "disini aman banget test",
  photoUrl: "imageUrlContoh",
  coordinate: "-12.94,106.94",
};

describe("Earthquake Events from Database /events/:id", () => {
  describe("GET", () => {
    it.only("200 success to fetch Earthquake detail and reports", (done) => {
      request(app)
        .get("/events/1")
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("earthQuake", expect.any(Object));
          expect(body).toHaveProperty("reports", expect.any(Array));
          done();
        });
    });
    // it.only("500 failed to fetch Earthquake detail and reports", (done) => {
    //   request(app)
    //     .get("events/1")
    //     .end((err, res) => {
    //       if (err) return done(err);

    //       const errorStatus = 500;
    //       const errorMessage = {
    //         message: "Internal server error",
    //       };

    //       expect(errorStatus).toBe(500);
    //       expect(errorMessage).toHaveProperty(
    //         "message",
    //         "Internal server error"
    //       );
    //       done();
    //     });
    //   done();
    // });
    it("200 success fetch Earthquake detail and reports with access token", (done) => {
      request(app);
      request(app)
        .get("/events/1")
        .set("access_token", access_token)
        .end(function (err, res) {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("earthQuake", expect.any(Object));
          expect(body).toHaveProperty("reports", expect.any(Array));
          done();
        });
    });
    it("404 failed earthquake event not found", (done) => {
      request(app)
        .get("/events/20000")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Event not found");
          done();
        });
    });
  });
});

describe("Earthquake Reports /reports", () => {
  describe("POST", () => {
    it("201 create report successfully with access token", (done) => {
      request(app)
        .post("/reports")
        .set("access_token", access_token)
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
    it("401 failed to create report without invalid access token", (done) => {
      request(app)
        .post("/reports")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        });
    });
    it("400 bad request to create report", (done) => {
      request(app);
      done();
    });
    it("404 earthquake event not found", (done) => {
      // request(app);
      done();
    });
  });
  describe("DELETE", () => {
    it("200 success to delete report with access token", (done) => {
      request(app)
        .post("/reports/5")
        .set("access_token", access_token)
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("message", "Report has been deleted");
          done();
        });
    });
    it("401 failed to delete report without access token", (done) => {
      request(app)
        .post("/reports/5")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
    it("404 failed to delete report because report not found", (done) => {
      request(app)
        .post("/reports/200")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
  });
});

afterAll(async () => {
  try {
    await EarthquakeReport.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await EarthquakeEvent.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (err) {
    console.log(err);
  }
});
