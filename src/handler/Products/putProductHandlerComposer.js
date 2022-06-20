function postProductHandlerComposer(diHash) {
  const {
    model,
    lodash,
    imageUpload,
    moment,
  } = diHash;

  const {
    Products,
    Category,
  } = model;
  async function postProductHandler(req, res) {
    try {
      const body = req.body;
      const params = req.params;
      const currentProduct = await Products.findOne({
        where: {
          id: params.id,
        },
      });

      if (lodash.isNil(currentProduct)) {
        return res.status(400).json({
          "success": false,
          "message": "Product Not Found",
        });
      }

      if (!lodash.isNil(body.name)) currentProduct.name = body.name;
      if (!lodash.isNil(body.desc)) currentProduct.desc = body.desc;
      if (!lodash.isNil(body.condition)) currentProduct.condition = body.condition;
      if (!lodash.isNil(body.initValue)) currentProduct.initValue = body.initValue;
      if (!lodash.isNil(body.buyNowValue)) currentProduct.buyNowValue = body.buyNowValue;
      if (!lodash.isNil(body.status)) currentProduct.status = body.status;
      if (!lodash.isNil(body.dateStarted)) currentProduct.dateStarted = moment(body.dateStarted).format("YYYY-MM-DD HH:mm:ss");
      if (!lodash.isNil(body.dateEnd)) currentProduct.dateEnd = moment(body.dateEnd).format("YYYY-MM-DD HH:mm:ss");
      let newImages = [];
      const images = currentProduct.imageProducts;

      if (!lodash.isNil(body.indexImageDeleted)) {
        const imageIndexDelete = body.indexImageDeleted;
        newImages = images.filter((img) => !imageIndexDelete.includes(images.indexOf(img)));
      } else {
        newImages = images;
      }
      if (!lodash.isNil(body.images)) {
        const responseImage = await Promise.all(body.images.map(async (image, index) => {
          return imageUpload(image, index, "products");
        }));
        newImages = newImages.concat(responseImage);
      }
      currentProduct.imageProducts = newImages;

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
        } currentProduct.categoryId = body.categoryId;

      }
      await currentProduct.save();

      return res.status(200).json({
        "success": true,
        "data": currentProduct,
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

