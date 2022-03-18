const request = require("supertest");
const app = require("../app");
const { EarthquakeEvent, EarthquakeReport, User } = require("../models");
const { signToken } = require("../helpers/jwt");

let validToken;
let invalidToken = "INVALID_TOKEN";

const fs = require("fs");

beforeAll(async () => {
  try {
    const userTest = {
      email: "test1@mail.com",
      password: "123456",
    };

    const user = await User.create(userTest);
    validToken = validToken = signToken({
      id: user.id,
      email: user.email,
    });

    const earthQuake = await JSON.parse(
      fs.readFileSync("./db/eventsEarthquake.json", "utf-8")
    );

    await EarthquakeEvent.bulkCreate(earthQuake);

    const EarthquakeReports = await JSON.parse(
      fs.readFileSync("./db/reportsEarthquake.json", "utf-8")
    );

    await EarthquakeReport.bulkCreate(EarthquakeReports);
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
    it("200 success to fetch Earthquake detail and reports", (done) => {
      request(app)
        .get("/events/earthquake/1")
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("earthQuake", expect.any(Object));
          expect(body).toHaveProperty("reports", expect.any(Array));
          done();
        });
    });
    it("200 success fetch Earthquake detail and reports with access token", (done) => {
      request(app);
      request(app)
        .get("/events/earthquake/1")
        .set("access_token", validToken)
        .end(function (err, res) {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("earthQuake", expect.any(Object));
          expect(body).toHaveProperty("reports", expect.any(Array));
          done();
        });
    });
    it("200 success fetch Earthquake detail and reports without access token", (done) => {
      request(app);
      request(app)
        .get("/events/earthquake/1")
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
        .get("/events/earthquake/20000")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Event not found");
          done();
        });
    });
  });
  describe("POST", () => {
    it("200 success to create Earthquake Event", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("area", expect.any(String));
          done();
        });
    });
    it("200 success to create Earthquake Event", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("area", expect.any(String));
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Date input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            // date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Date is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Hour input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            // hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Hour is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Date Time input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            // dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Date Time is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Coordinates Time input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            // coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Coordinates is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Magnitude Time input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            // magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Magnitude is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Depth Time input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            // depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Depth is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Area Time input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            // area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Area is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Dirasakan Time input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            // dirasakan: "II-III Ambon",
            potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Dirasakan is required");
          done();
        });
    });
    it("400 failed to create Earthquake Event because Invalid Potensi Time input", (done) => {
      request(app)
        .post("/events/earthquake")
        .send({
          earthquakeEvent: {
            date: "16 Mar 2022",
            hour: "21:12:00 WIB",
            dateTime: "2022-03-16T14:12:00+00:00",
            coordinates: "-3.70,128.12",
            magnitude: "2.7",
            depth: 10,
            area: "Pusat gempa berada di laut 47 km Baratdaya Kairatu",
            dirasakan: "II-III Ambon",
            // potensi: "Tidak berpotensi tsunami",
          },
        })
        .end(function (err, res) {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body[0]).toBe("Potensi is required");
          done();
        });
    });
  });
});

describe("Earthquake Reports /reports/earthquakes", () => {
  describe("GET", () => {
    it("200 success fetch all Earthquake reports", (done) => {
      request(app)
        .get("/reports/earthquakes")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Array));
          expect(body[0]).toHaveProperty("id", expect.any(Number));
          done();
        });
    });
    it("200 success get one Earthquake report", (done) => {
      request(app)
        .get("/reports/earthquakes/1")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("status", expect.any(String));
          done();
        });
    });
    it("404 failed get one Earthquake report because report not found", (done) => {
      request(app)
        .get("/reports/earthquakes/300")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Report not found");
          done();
        });
    });
  });
  describe("POST", () => {
    it("201 create report successfully with access token", (done) => {
      request(app)
        .post("/reports/earthquakes")
        .set("access_token", validToken)
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
    it("401 failed to create report without access token", (done) => {
      request(app)
        .post("/reports/earthquakes")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        });
    });
    it("400 bad request Status is null to create report", (done) => {
      request(app)
        .post("/reports/earthquakes")
        .set("access_token", validToken)
        .send({
          UserId: 1,
          EventquakeId: 1,
          // status: "Safe",
          description: "disini aman banget test",
          photoUrl: "imageUrlContoh",
          coordinate: "-12.94,106.94",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Array));
          expect(body[0]).toBe("Status is required");
          done();
        });
    });
    it("400 bad request Description is null to create report", (done) => {
      request(app)
        .post("/reports/earthquakes")
        .set("access_token", validToken)
        .send({
          UserId: 1,
          EventquakeId: 1,
          status: "Safe",
          // description: "disini aman banget test",
          photoUrl: "imageUrlContoh",
          coordinate: "-12.94,106.94",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Array));
          expect(body[0]).toBe("Description is required");
          done();
        });
    });
    it("400 bad request Coordinate is null to create report", (done) => {
      request(app)
        .post("/reports/earthquakes")
        .set("access_token", validToken)
        .send({
          UserId: 1,
          EventquakeId: 1,
          status: "Safe",
          description: "disini aman banget test",
          photoUrl: "imageUrlContoh",
          // coordinate: "-12.94,106.94",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Array));
          expect(body[0]).toBe("Coordinate is required");
          done();
        });
    });
    // it("404 earthquake event not found", (done) => {
    //   request(app);
    //   done();
    // });
  });
  describe("DELETE", () => {
    it("200 success to delete report with access token", (done) => {
      request(app)
        .post("/reports/earthquakes/1")
        .set("access_token", validToken)
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
        .post("/reports/earthquakes/1")
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        });
    });
    it("401 failed to delete report with Invalid access token", (done) => {
      request(app)
        .post("/reports/earthquakes/1")
        .set("access_token", invalidToken)
        .send(report)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        });
    });
    it("404 failed to delete report because report not found", (done) => {
      request(app)
        .post("/reports/earthquakes/200")
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
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
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
