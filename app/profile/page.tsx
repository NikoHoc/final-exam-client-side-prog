'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getUserSession } from '../lib/getSession';
import Link from 'next/link';
import Swal from 'sweetalert2';


export default function Profile () {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
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
            setUsername(user.username);
            setRole(user.role);
        };
    
        fetchUser();
    }, [router]);


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there, you are {role === 'admin' ? 'an admin!' : 'a user'}</h1>
                    <p className="py-6">
                        Username: {username}
                    </p>
                    <Link href={'/'} className="btn btn-primary">Back to home</Link>
                </div>
            </div>
        </div>
    )
}