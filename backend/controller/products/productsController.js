const Products = require("../../models/product");
const catchAsync = require("../../utils/catchAsync");

// Show all Products
module.exports.allProducts = catchAsync(async (req, res) => {
  let { search } = req.query;
  // If there is a search query then fetch the searched product, if any
  if (search !== undefined) {
    search = search.trim();
    if (search === "") return res.json({ requestedProducts: [] });
    const requestedProducts = await Products.find({
      title: { $regex: search, $options: "i" },
    });  
    return res.json({ requestedProducts });
  }
  const allProducts = await Products.find({});
  return res.json({ allProducts });
});

// Show single Product details
module.exports.show = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (product) {
    return res.json(product);
  }
  res.send(`Product not Found`);
});
