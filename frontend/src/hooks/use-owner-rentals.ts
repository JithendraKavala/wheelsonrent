import { useEffect, useState } from 'react';
import { PaginatedRentals, Vehicle } from '@/types';

export default function useOwnerPaginatedRentals(token: string | null, page: number = 0, size: number = 5) {
    const [paginatedRentals, setPaginatedRentals] = useState<PaginatedRentals>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        const fetchVehicles = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owner/rental-history?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            });

            if (!res.ok) throw new Error(`Error: ${res.status}`);

            const data: PaginatedRentals = await res.json();
            setPaginatedRentals(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
        };

        fetchVehicles();
    }, [token, page]);

    return { paginatedRentals, loading, error };
}
