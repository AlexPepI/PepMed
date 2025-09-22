import { api } from "../../lib/api.ts";

export type RefEntity = "medicine" | "disease" | "symptom";
export type RefItem = { id: string | number; name: string };

const endpoints: Record<RefEntity, string> = {
  medicine: "/medicine",
  disease: "/disease",
  symptom: "/symptom",
};

export async function fetchConstant(entity: RefEntity): Promise<RefItem[]> {
  const { data } = await api.get(`${endpoints[entity]}/all`);
  return data;
}

export async function addConstant(entity: RefEntity, name: string) {
  const { data } = await api.post(`${endpoints[entity]}/`, { name });
  return data;
}

export async function deleteConstant(entity: RefEntity, id: number) {
  await api.delete(`${endpoints[entity]}/`, { data: { id } });
}
