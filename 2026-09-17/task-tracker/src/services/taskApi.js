export async function getTasks(signal) {
  const response = await fetch(`${import.meta.env.BASE_URL}tasks.json`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(
      `Failed to load tasks: ${response.status} ${response.statusText}`,
    );
  }
  const data = await response.json();
  return data;
}
