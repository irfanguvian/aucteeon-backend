function getExampleListHandlerFcomposer(diHash) {
  async function getExampleListHandler(req, res) {
    try {
      res.send("Hellow World");
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
  return getExampleListHandler;
}

module.exports = getExampleListHandlerFcomposer;
