/* eslint-disable @typescript-eslint/no-explicit-any */
export function sanitizeParams<T extends Record<string, any>>(params: T): Partial<T> {
    const clean: Partial<T> = {};

    Object.entries(params).forEach(([key, value]) => {
        if (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
        ) {
            return; // skip
        }

        clean[key as keyof T] = value;
    });

    return clean;
}
