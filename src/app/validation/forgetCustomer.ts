import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "boolean" },
    cpf: { type: "boolean" },
    email: { type: "boolean" },
    address: { type: "boolean"},
    phone: { type: "boolean"}
  },
  required: ["id", "name", "cpf", "email", "address", "phone"],
  additionalProperties: false
}

export default ajv.compile(schema);