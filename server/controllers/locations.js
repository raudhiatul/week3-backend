import sequelize from "../models/init-models.js";

const getLocations = async (req, res) => {
  try {
    const locations = await req.context.models.locations.findAll();
    return res.send(locations);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getLocationById = async (req, res) => {
  try {
    const location = await req.context.models.locations.findOne({
      where: { location_id: req.params.id },
    });
    return res.send(location);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const addLocation = async (req, res) => {
  try {
    const { location_id, street_address, postal_code, city, state_province, country_id } = req.body;
    const location = await req.context.models.locations.create({
      location_id: location_id,
      street_address: street_address,
      postal_code: postal_code,
      city: city,
      state_province: state_province,
      country_id: country_id,
    });
    return res.send(location);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateLocation = async (req, res) => {
  try {
    const { street_address, postal_code, city, state_province, country_id } = req.body;
    const location = await req.context.models.locations.update(
      {
        street_address: street_address,
        postal_code: postal_code,
        city: city,
        state_province: state_province,
        country_id: country_id,
      },
      { returning: true, where: { location_id: req.params.id } }
    );
    return res.send(location);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await req.context.models.locations.destroy({
      where: { location_id: req.params.id },
    });
    return res.send(`delete ${location} rows`);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getLocationQueryById = async (req, res) => {
  try {
    const query = await sequelize.query("SELECT * from locations where location_id = :id", { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT });
    return res.send(query);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  getLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
  getLocationQueryById,
};