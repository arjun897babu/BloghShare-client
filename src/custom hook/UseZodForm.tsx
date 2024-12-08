import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema, TypeOf } from "zod";

function useZodForm<T extends ZodSchema>( 
    schema: T,
    defaultValues: TypeOf<T>
): UseFormReturn<TypeOf<T>> {
    return useForm<TypeOf<T>>({
        resolver: zodResolver(schema),
        defaultValues,
    });
}

export { useZodForm };
