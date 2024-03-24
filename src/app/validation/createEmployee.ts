import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
  },
  required: ["id", "name", "email"],
  additionalProperties: false
}

export default ajv.compile(schema);