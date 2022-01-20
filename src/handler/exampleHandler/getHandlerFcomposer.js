function getExampleHandlerFcomposer(diHash) {
  async function getExampleHandler(req, res) {
    try {
      res.send("Hellow World");
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
  return getExampleHandler;
}

module.exports = getExampleHandlerFcomposer;
