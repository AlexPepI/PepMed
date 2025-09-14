import {api} from "../../lib/api";
import type { VisitorInput } from "../../types/visitor";
import { buildCreateVisitorPayload } from "./adapters";

export async function createVisitor(input: VisitorInput) {
  const payload = buildCreateVisitorPayload(input);
  console.log(payload)
  const { data } = await api.post("/visitor/create", payload);
  return data;
}
