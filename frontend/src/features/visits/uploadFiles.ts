export async function uploadFiles(visitId: number, files: File[]) {
  const fd = new FormData();
  for (const f of files) fd.append("files", f); // must be "files"
  const res = await fetch(`/api/files/?visit_id=${visitId}`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  const data = await res.json();
  return data.saved_paths as string[];
}
