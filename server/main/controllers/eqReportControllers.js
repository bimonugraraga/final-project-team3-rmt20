const { EarthquakeReport, EarthquakeEvent } = require("../models");

class reportController {
  static async allEarthquakeReport(req, res, next) {
    try {
      const reports = await EarthquakeReport.findAll();
      res.status(200).json(reports);
    } catch (err) {
      next(err);
    }
  }
  static async createReport(req, res, next) {
    try {
      const { status, description, photoUrl, coordinate } = req.body;
      const { access_token } = req.headers;

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
        UserId: 1,
        EventquakeId: 4,
      };

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
