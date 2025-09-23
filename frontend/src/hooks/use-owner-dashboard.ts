import { useEffect, useState } from 'react';
import { OwnerDashBoardStats } from '@/types';

export default function useOwnerDashboard(token: string | null) {
    const [stats, setStats] = useState<OwnerDashBoardStats>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        const fetchOwnerDashBoardStatss = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owner/dashboard-summary`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            });

            if (!res.ok) throw new Error(`Error: ${res.status}`);

            const data: OwnerDashBoardStats = await res.json();
            console.log(data);
            
            setStats(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to fetch OwnerDashBoardStats');
        } finally {
            setLoading(false);
        }
        };

        fetchOwnerDashBoardStatss();
    }, [token]);

    return { stats, loading, error };
}
