import supabase from "@/lib/supabase";
import { Tables, InsertTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Product = Tables<"products">;

export const useProductList = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (error) {
                throw new Error(error.message);
            }
            if (data) {
                return data;
            }
        },
    });

}

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
            if (error) {
                throw new Error(error.message);
            }
            if (data) {
                return data;
            }
        },
    });
}


export const useInsertProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(data: InsertTables<'products'>) {
            const { error, data: newProduct } = await supabase.from('products').insert({
                name: data.name,
                price: data.price,
                image: data.image,
            });

            if (error) {
                throw error;
            }
            return newProduct;

        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ["products"] });
        }, onError(error) {
            console.log(error);
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ id, ...update }: Product) {
            const { data, error } = await supabase
                .from('products')
                .update(update)
                .eq('id', id)
                .select();

            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries({ queryKey: ['products'] });
            await queryClient.invalidateQueries({ queryKey: ['product', id] });
        },
        onError(error) {
            console.log(error);
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: Product['id']) {
            const { data, error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);


            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, id) {
            await queryClient.invalidateQueries({ queryKey: ['products'] });

        },
        onError(error) {
            console.log(error);
        },
    });
}