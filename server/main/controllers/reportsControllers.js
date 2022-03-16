const { EarthquakeReport } = require("../models");

class reportController {
  static async createReport(req, res) {
    try {
      const { status, description, photoUrl, coordinate } = req.body;
      console.log(req.body);
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
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = reportController;
