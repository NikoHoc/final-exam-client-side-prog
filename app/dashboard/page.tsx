"use client"

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { getUserSession } from '../lib/getSession';
import Swal from "sweetalert2";

export default function Dashboard () {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const { user, error } = await getUserSession();

            if (!user || error) {
                Swal.fire({
                    icon: "warning",
                    title: "Belum login",
                    text: error.message + ", silahkan login terlebih dahulu",
                    confirmButtonText: "OK",
                }).then(() => {
                    router.push("/sign-in");
                });
                return;
            }

            setRole(user.role);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        );
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello, {role === "admin" ? "Admin" : "User"}</h1>
                    <p className="py-6">
                        {role === "admin"
                        ? "You have administrative access. Manage the system below."
                        : "You are a regular user. Browse and enjoy the features."}
                    </p>
                    
                </div>
            </div>
        </div>
    )
}