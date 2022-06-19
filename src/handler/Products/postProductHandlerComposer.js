function postProductHandlerComposer(diHash) {
  const {
    model,
    lodash,
    imageUpload,
  } = diHash;

  const {
    Products,
    Category,
  } = model;
  async function postProductHandler(req, res) {
    try {
      const body = req.body;

      const createProductBody = {
        name: "",
        images: [],
        desc: "",
        condition: "",
        categoryId: "",
        initValue: "",
        buyNowValue: "",
        productOwner: "", // ambil dari req.user, nunggu dulu
        status: "SHOW", // SHOW , DELETED, FINISHED
      };

      if (!lodash.isNil(body.name)) createProductBody.name = body.name;
      if (!lodash.isNil(body.desc)) createProductBody.desc = body.desc;
      if (!lodash.isNil(body.condition)) createProductBody.condition = body.condition;
      if (!lodash.isNil(body.initValue)) createProductBody.initValue = body.initValue;
      if (!lodash.isNil(body.buyNowValue)) createProductBody.buyNowValue = body.buyNowValue;

      if (!lodash.isNil(body.images)) {
        const responseImage = await Promise.all(body.images.map(async (image, index) => {
          return imageUpload(image, index, "products");
        }));
        createProductBody.images = responseImage;
      }

      if (!lodash.isNil(body.categoryId)) {
        const checkCategory = await Category.findOne({
          where: {
            id: body.categoryId,
          },
        });

        if (lodash.isNil(checkCategory)) {
          return res.status(400).json({
            "success": false,
            "message": "Category Not Found",
          });
        } createProductBody.categoryId = body.categoryId;

      }
      const createProduct = await Products.create(createProductBody);

      return res.status(200).json({
        "success": true,
        "data": createProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "success": false,
        "message": error.message,
      });
    }
  }
  return postProductHandler;
}

module.exports = postProductHandlerComposer;

