const imageUpload = require("../../utils/imageUploads");

function postCategoryHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Category,
  } = model;
  async function postCategoryHandler(req, res) {
    try {
      const body = req.body;
      const path = await imageUpload(body.image);

      const categoryInsertArgs = {
        name: body.name,
        image: path,
      };

      const category = await Category.create(categoryInsertArgs);

      return res.status(200).json({
        "success": true,
        "data": category,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message": error.message,
      });
    }
  }
  return postCategoryHandler;
}

module.exports = postCategoryHandlerComposer;

