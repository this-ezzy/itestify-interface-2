import { useSearchParams } from "next/navigation";

type ParamKeys = string[];
type ParamResult = Record<string, string>;

const useGetParams = (keys: ParamKeys, defaults?: Record<string, string>): ParamResult => {
    const searchParams = useSearchParams();
    const result: ParamResult = {};

    keys.forEach((key) => {
        const value = searchParams.get(key);
        result[key] = value ?? defaults?.[key] ?? "";
    });

    return result;
};

export default useGetParams;