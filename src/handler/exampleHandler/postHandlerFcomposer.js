function postExampleHandlerFcomposer(diHash) {
  async function postExampleHandler(req, res) {
    try {
      res.send("Hellow World");
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
  return postExampleHandler;
}

module.exports = postExampleHandlerFcomposer;
