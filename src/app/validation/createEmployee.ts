import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    matriculation: { type: "string" },
    password: { type: "string" },
  },
  required: ["name", "email", "matriculation", "password"],
  additionalProperties: false
}

export default ajv.compile(schema);