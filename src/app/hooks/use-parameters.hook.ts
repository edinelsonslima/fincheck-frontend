import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { enTransactionType } from "../../types/enums/transaction-type.enum";
import { useCallback, useMemo } from "react";

const schema = z.object({
  month: z.coerce.number().min(0).max(11).nonnegative(),
  year: z.coerce.number().min(2000).max(9999).positive(),
  bankAccountId: z.string().uuid().optional(),
  type: z
    .enum([enTransactionType.EXPENSE, enTransactionType.INCOME])
    .optional(),
});

type IParameters = z.infer<typeof schema>;

function parseParameters(params: IParameters) {
  try {
    return schema.parse(JSON.parse(JSON.stringify(params)));
  } catch (error) {
    if (!(error instanceof z.ZodError)) {
      return params;
    }

    const parametersWithError = error.errors.map(({ path }) => {
      return path.join();
    }) as (keyof IParameters)[];

    parametersWithError.forEach((paramsWithError) => {
      delete params[paramsWithError];
    });

    return params;
  }
}

const initialParameters: IParameters = parseParameters({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});

const initialSearchParams = Object.entries(initialParameters).reduce(
  (acc, [key, value]) => ({ ...acc, [key]: String(value) }),
  {}
);

export function useParameters() {
  const [searchParams, setSearchParams] = useSearchParams(initialSearchParams);

  const parameters = useMemo(() => {
    const allParameters = Object.fromEntries(searchParams.entries());
    return parseParameters(allParameters as unknown as IParameters);
  }, [searchParams]);

  const setParameter = useCallback(
    function <T extends keyof IParameters>(
      key: T,
      value: IParameters[T] | undefined | null
    ) {
      const invalidValues = [undefined, null, ""];

      return setSearchParams((params) => {
        if (invalidValues.includes(value as null)) {
          params.delete(key);
          return params;
        }

        params.set(key, String(value));
        return params;
      });
    },
    [setSearchParams]
  );

  return [parameters, setParameter] as const;
}
