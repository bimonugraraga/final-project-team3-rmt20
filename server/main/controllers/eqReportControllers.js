const { EarthquakeReport, EarthquakeEvent, User } = require("../models");

class reportController {
  static async allEarthquakeReport(req, res, next) {
    try {
      // first look for EQ event
      const { dateTime, coordinates } = req.query;
      const event = await EarthquakeEvent.findOne({
        where: {
          dateTime,
          coordinates,
        },
      });

      // then get all associated reports
      const reports = await EarthquakeReport.findAll({
        where: {
          EventquakeId: event.id,
        },
        include: {
          model: User,
          attributes: ["email"],
        },
      });
      res.status(200).json(reports);
    } catch (err) {
      next(err);
    }
  }

  static async createReport(req, res, next) {
    try {
      const { status, description, photoUrl, coordinate, date, hour, dateTime, coordinates, magnitude, depth, area, dirasakan, potensi, shakeMap } = req.body;
      const { access_token } = req.headers;
      let { id } = req.loggedUser;

      // first findOrCreateEvents
      const [event] = await EarthquakeEvent.findOrCreate({
        where: { dateTime, coordinates },
        defaults: {
          coordinate,
          date,
          hour,
          dateTime,
          coordinates,
          magnitude,
          depth,
          area,
          dirasakan,
          potensi,
          shakeMap,
        },
      });

      if (!access_token) {
        throw {
          name: "Unauthorized",
          code: 401,
          message: "Invalid token",
        };
      }

      const payload = {
        status,
        description,
        photoUrl,
        coordinate,
        UserId: +id,
        EventquakeId: +event.id,
      };

      // then create report
      const report = await EarthquakeReport.create(payload);

      res.status(201).json(report);
    } catch (err) {
      next(err);
    }
  }

  static async earthquakeReportById(req, res, next) {
    try {
      const { id } = req.params;
      const report = await EarthquakeReport.findByPk(+id);
      if (!report) {
        throw {
          name: "NOT FOUND",
          code: 404,
          message: "Report not found",
        };
      }

      res.status(200).json(report);
    } catch (err) {
      next(err);
    }
  }

  static async removeReport(req, res, next) {
    try {
      const { id } = req.params;

      const report = await EarthquakeReport.findByPk(+id);
      if (!report) {
        throw {
          name: "NOT FOUND",
          code: 404,
          message: "Report not found",
        };
      }

      await EarthquakeReport.destroy({
        where: {
          id: +id,
        },
      });

      res.status(200).json({
        message: "Report has been deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = reportController;
