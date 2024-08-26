import { readFileSync } from "fs";
import path from "path";
import { parse } from "yaml";

const swaggerDocument = parse(
  readFileSync(path.resolve("src/docs/swagger.yaml"), "utf-8")
);

export default swaggerDocument;
