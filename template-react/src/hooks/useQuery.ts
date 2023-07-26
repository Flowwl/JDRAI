import {
  MutationFunction,
  MutationKey,
  useMutation as useReactMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult
} from "react-query";
import { ApiError } from "@/utils/apiError";

export const useQuery = <TData = unknown>(options: QueryOptions<TData>): QueryResult<TData> => {
  const { onError, ...rest } = options;
  return useReactQuery<unknown, ApiError, TData>({
    retry: false,
    cacheTime: 10000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError(e) {
      onError && onError(e);
    },
    ...rest
  });
};

export const useMutation = <TVariables = unknown, TData = unknown, TContext = unknown>(
  options: MutationOptions<TVariables, TData, TContext>
): MutationResult<TVariables, TData, TContext> => {
  const { mutationKey, mutationFn, ...rest } = options;
  return useReactMutation<TData, ApiError, TVariables, TContext>(mutationKey, mutationFn, {
    retry: false,
    ...rest
  });
};

type AdditionalQueryParams = {
  isToastHidden?: boolean;
};

// QUERY
export type QueryParams<TData = unknown> = AdditionalQueryParams &
  Omit<QueryOptions<TData>, "queryKey" | "queryFn" | "select" | "placeholderData">;

interface QueryOptions<TData = unknown> extends UseQueryOptions<unknown, ApiError, TData> {
  onSuccess?: (data: TData) => Promise<TData> | void;
  onError?: (error: ApiError) => Promise<TData> | void;
}

export type QueryResult<TData = unknown> = UseQueryResult<TData, ApiError>;

// MUTATION
export type MutationParams<TVariables = unknown, TData = unknown, TContext = unknown> = AdditionalQueryParams &
  Omit<MutationOptions<TVariables, TData, TContext>, "mutationKey" | "mutationFn">;

interface MutationOptions<TVariables, TData, TContext = unknown>
  extends UseMutationOptions<TData, ApiError, TVariables, TContext> {
  mutationFn: MutationFunction<TData, TVariables>;
  mutationKey: MutationKey;
  onSuccess?: (data: TData, variables?: TVariables, context?: TContext) => Promise<void> | void;
  onError?: (error: ApiError, variables?: TVariables, context?: TContext) => Promise<void> | void;
}

export type MutationResult<TVariables = unknown, TData = unknown, TContext = unknown> = UseMutationResult<
  TData,
  ApiError,
  TVariables,
  TContext
>;
