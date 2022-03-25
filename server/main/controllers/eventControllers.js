const axios = require("axios");
const { EarthquakeEvent, EarthquakeReport } = require("../models");

class EventController {
  static async createEventEq(req, res, next) {
    try {
      const { earthquakeEvent } = req.body;
      console.log(earthquakeEvent)
      const earthquake = await EarthquakeEvent.create(earthquakeEvent);
      res.status(201).json(earthquake);
    } catch (err) {
      next(err);
    }
  }
  static async detailEq(req, res, next) {
    try {
      const { id } = req.params;
      const detail = await EarthquakeEvent.findByPk(+id);

      if (!detail) {
        throw {
          name: "NOT FOUND",
          code: 404,
          message: "Event not found",
        };
      }
      const reports = await EarthquakeReport.findAll({
        where: {
          EventquakeId: detail.id,
        },
      });

      res.status(200).json({
        earthQuake: detail,
        reports: reports,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
