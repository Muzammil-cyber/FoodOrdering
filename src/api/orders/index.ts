
import supabase from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Tables, OrderStatus, InsertTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyOrders = () => {
    const { session } = useAuth();
    const user = session?.user;

    return useQuery<Tables<'orders'>[]>({
        queryKey: ['orders', { userId: user?.id }],
        queryFn: async () => {
            if (!user) return [];

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useOrderList = ({ archived = false }: { archived: boolean }) => {
    const statuses: OrderStatus[] = archived
        ? ['Delivered']
        : ['New', 'Cooking', 'Delivering'];

    return useQuery<Tables<'orders'>[]>({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .in('status', statuses)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*, products(*))')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId: string = session?.user.id || '';

    return useMutation({
        async mutationFn(data: Omit<InsertTables<'orders'>, 'user_id'>) {
            const { error, data: newOrder } = await supabase
                .from('orders')
                .insert({ ...data, user_id: userId })
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return newOrder;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    })
};

export const useUpdateOrder = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ status }: { status: OrderStatus }) {
            const { error, data: updatedOrder } = await supabase
                .from('orders')
                .update({ status })
                .eq('id', id)
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedOrder;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['order', id] });
            await queryClient.invalidateQueries({ queryKey: ['orders'] });

        },
    });
};
