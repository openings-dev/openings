interface LoadSafelyParams<TData> {
  load: () => Promise<TData>;
  defaultValue: TData;
}

export enum LoadResultStatus {
  Success = "success",
  Failure = "failure",
}

export type LoadResult<TData> =
  | { status: LoadResultStatus.Success; data: TData }
  | { status: LoadResultStatus.Failure };

export async function loadWithStatus<TData>({
  load,
}: Pick<LoadSafelyParams<TData>, "load">): Promise<LoadResult<TData>> {
  try {
    return { status: LoadResultStatus.Success, data: await load() };
  } catch {
    return { status: LoadResultStatus.Failure };
  }
}

export async function loadSafely<TData>({
  load,
  defaultValue,
}: LoadSafelyParams<TData>) {
  try {
    return await load();
  } catch {
    return defaultValue;
  }
}
