interface LoadSafelyParams<TData> {
  load: () => Promise<TData>;
  fallback: TData;
  errorMessage: string;
}

export async function loadSafely<TData>({
  load,
  fallback,
  errorMessage,
}: LoadSafelyParams<TData>) {
  try {
    return await load();
  } catch (error) {
    console.error(errorMessage, error);
    return fallback;
  }
}
