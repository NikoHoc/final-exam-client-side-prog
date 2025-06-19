"use client"

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { getUserSession } from '../lib/getSession';

export default function Navbar () {
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
        const { user, error } = await getUserSession();
        if (error || !user) {
            console.error("User session error:", error);
            return;
        }
        setUsername(user.username);
        };

        fetchUser();
    }, []);

    const handleSignOut = async () => {
        const result = await Swal.fire({
            title: 'Sign Out?!',
            text: 'Apakah kamu yakin ingin sign out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, logout',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            const { error } = await supabase.auth.signOut();

            if (error) {
                Swal.fire('Gagal!', error.message, 'error');
                console.error("Error signing out:", error.message);
            } else {
                Swal.fire('Berhasil!', 'Kamu telah logout.', 'success');
                router.push("/sign-in");
            }
        }
    };


    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="flex-1">
                <span className="btn btn-ghost text-xl" onClick={ () => window.location.reload() }>
                {username ? `Hi, ${username}` : "Loading..."}
                </span>
            </div>
            <div className="flex-none">
                <button onClick={handleSignOut} className="flex items-center gap-2 btn btn-ghost text-sm hover:bg-red-500 hover:text-white hover:font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"/>
                    </svg>
                    Sign Out
                </button>
            </div>
        </div>
    )
}