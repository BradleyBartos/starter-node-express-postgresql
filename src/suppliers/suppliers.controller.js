const suppliersService = require('./suppliers.service.js');
const checkProperties = require('../errors/checkProperties.js');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];
const REQUIRED_PROPERTIES = [
  "supplier_name",
  "supplier_email",
];
const hasOnlyValidProperties = checkProperties.hasOnlyValidProperties(VALID_PROPERTIES);
const hasProperties = checkProperties.hasProperties(REQUIRED_PROPERTIES);
async function supplierExists(req, res, next) {
  const data = await suppliersService.read(req.params.supplierId)
  if (data) {
    res.locals.supplier = data;
    return next();
  }
  next({ status: 404, message: `Supplier cannot be found.` });
}

// handlers
async function create(req, res, next) {
  const data = await suppliersService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  const data = await suppliersService.update(updatedSupplier);
  res.json({ data });
}

async function destroy(req, res, next) {
  await suppliersService.delete(res.locals.supplier.supplier_id)
  res.sendStatus(204)
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasProperties,
    asyncErrorBoundary(create)
  ],
  update: [
    hasOnlyValidProperties,
    hasProperties,
    asyncErrorBoundary(supplierExists),
    asyncErrorBoundary(update)
  ],
  delete: [
    asyncErrorBoundary(supplierExists), 
    asyncErrorBoundary(destroy)
  ],
};
