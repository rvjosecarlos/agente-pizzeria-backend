import { Router } from "express";
import { validateWithZod } from "../middlewares/zodValidator.middleware.ts";
import { ItemController } from "../controllers/item.controller.ts";
import { errorMiddleware } from "../middlewares/error.middleware.ts";
import { CreateItemSchema, GetItemSchema, ItemSchema } from "../types/index.ts";

const router = Router();

router.post("/item",
    validateWithZod(CreateItemSchema),
    ItemController.createItem,
    errorMiddleware
);

router.get("/items",
    ItemController.getItems,
    errorMiddleware
);

router.get("/item/:id", 
    validateWithZod(GetItemSchema),
    ItemController.getItem,
    errorMiddleware
);

router.put("/item",
    validateWithZod(ItemSchema),
    ItemController.updateItem,
    errorMiddleware
);

router.delete("/item/:id",
    validateWithZod(GetItemSchema),
    ItemController.deleteItem,
    errorMiddleware
);

export default router;