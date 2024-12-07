import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function useZodForm<T extends FieldValues>(
  schema: z.Schema<any, any>,
  defaultValues: DefaultValues<T>
) {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
