const postRequest = async (req, collection) => {
  const endpointExists = await collection.findOne({
    endpoint: req["originalUrl"],
  });
//   console.log(endpointExists);
  collection.replaceOne(
    {
      endpoint: req["originalUrl"],
    },
    { endpoint: req["originalUrl"], ...req.body },
    { upsert: true }
  );
  if (endpointExists) {
    return "Data was replaced by new one";
  }
  return "Data is saved";
};

const getRequest = async (req, collection) => {
  const result = await collection.findOne({ endpoint: req["originalUrl"] });
  if (!result) {
    return "You should firstly send POST-request using this endpoint!";
  }
  return result;
};

export { postRequest, getRequest };
