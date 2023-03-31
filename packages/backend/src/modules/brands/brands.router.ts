import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "./brands.controller";

const brandsRouter = Router();

brandsRouter
  .get("/brands", getAllBrands)
  .post("/brands", createBrand)
  .get("/brands/:brandId", getBrand)
  .put("/brands/:brandId", updateBrand)
  .delete("/brands/:brandId", deleteBrand);

export default brandsRouter;

/*

router.get('/', async (req, res) => {
    try {
        const result = await getAllBrands();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}
);

*/
