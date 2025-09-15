import {api} from "../../lib/api";
import type { VisitorInput } from "../../types/visitor";
import { buildCreateVisitorPayload } from "./adapters";

export async function createVisitor(input: VisitorInput) {
  const payload = buildCreateVisitorPayload(input);
  const { data } = await api.post("/visitor/create", payload);
  console.log(data)
  return data;
}
