const productsService = require("./products.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function productExists(req, res, next) {
  const data = await productsService.read(req.params.productId);
  if (data) {
    res.locals.product = data;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res, next) {
  res.json({ data: res.locals.product });
}

async function list(req, res, next) {
  try {
    const data = await productsService.list();
    res.json({ data })
  } catch(error) {
    next(error)
  }
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
