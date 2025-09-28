"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { useAuth } from "@/hooks/useAuth";

interface TokenPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export default function OwnerLayout({
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
        router.push('/login');
    }
    else if(role !== 'owner'){
        router.push('/');
    }
  return (
    children
  );
}
