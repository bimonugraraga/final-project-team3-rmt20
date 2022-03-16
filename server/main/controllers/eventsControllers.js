const axios = require("axios");
const { EarthquakeEvent, EarthquakeReport } = require("../models");

class EventController {
  static async allEarthquake(req, res) {
    try {
      const { data } = await axios.get(
        "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"
      );
      console.log("fetch pada", new Date().toDateString());
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async detailEq(req, res) {
    try {
      const { id } = req.params;
      const detail = await EarthquakeEvent.findByPk(+id);
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
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = EventController;
