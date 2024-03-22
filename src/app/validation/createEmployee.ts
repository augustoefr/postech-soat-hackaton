import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false
}

export default ajv.compile(schema);