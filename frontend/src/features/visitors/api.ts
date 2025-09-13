import {api} from "../../lib/api";
import type { VisitorInput } from "../../types/visitor";

export const createVisitor = async (payload: VisitorInput) => {
  const { data } = await api.post("/visitor/create", payload);
  return data;
};
