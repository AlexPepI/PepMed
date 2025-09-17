import {api} from "../../lib/api";
import type { VisitorInput } from "../../types/visitor";
import { buildCreateVisitorPayload } from "./adapters";
import type { VisitorsHomePage,Visitor } from "../../types/visitor";

export async function createVisitor(input: VisitorInput) {
  const payload = buildCreateVisitorPayload(input);
  const { data } = await api.post("/visitor/create", payload);
  return data;
}

export async function getVisitors(params: { cursor: number }) {
  const res = await api.get<VisitorsHomePage>('/api/visitor/all', {
    params: { cursor: params.cursor },
  });
  return res.data;
}

export async function searchVisitors(params: { q: string }) {
  const res = await api.get<Visitor[]>('/api/visitor/search', {
    params: { search_term: params.q },
  });
  return res.data;
}

export type GetVisitorByIdResponse = import("../../types/visitor").VisitorDetail;

export async function getVisitorById(id: number): Promise<GetVisitorByIdResponse> {
  const { data } = await api.get(`/api/visitor/${id}`);
  return data as GetVisitorByIdResponse;
}

export async function updateVisitor(id: number, data: VisitorInput) {
  const payload = buildCreateVisitorPayload(data);
  const res = await api.put(`/visitor/${id}`, payload);
  return res.data;
}