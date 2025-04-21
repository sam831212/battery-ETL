import { z } from 'zod';

export const transformedDataSchema = z.object({
  id: z.number(),
  voltage: z.number(),
  current: z.number(),
  temperature: z.number(),
  timestamp: z.string()
});

export const transformedDataArraySchema = z.array(transformedDataSchema);

export function validateTransformedData(data: unknown) {
  const result = transformedDataArraySchema.safeParse(data);
  return {
    success: result.success,
    data: result.success ? result.data : null,
    error: result.success ? null : result.error
  };
} 