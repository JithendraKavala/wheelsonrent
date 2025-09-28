"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface TokenPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
    const { role, isLoggedIn, isLoading, logout } = useAuth();

    if(isLoading){
        return <div>Loading...</div>;
    }
   if( !isLoggedIn){
        // router.push('/admin/login');
    }
    else if(role !== 'admin'){
        router.push('/');
    }
  return (
    children
  );
}
