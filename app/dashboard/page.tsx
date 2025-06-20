"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from '../lib/getSession';
import Swal from "sweetalert2";
import ProductList from '../components/ProductList';
import ProductFormModal from '../components/FormModal';

interface Product {
  id: number;
  created_at: string;
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
}

export default function Dashboard () {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [editData, setEditData] = useState<Product | null>(null);

    const openAddModal = () => {
        setFormMode('add');
        setEditData(null);
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setFormMode('edit');
        setEditData(product);
        setShowModal(true);
    };

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
    }, [router]);

    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        );
    }

    return (
        <div className='mx-auto'>
            <div className="hero bg-black">
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center p-20">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Dashboard {role === "admin" ? 'Admin' : 'User'}</h1>
                        <p className="mb-5">
                            {role === "admin" ? 'Feel free to Create, Read, Update, and Delete the product data!' : 'Welcome user! Feel free to checkout our product list!'}
                        </p>
                    </div>
                </div>
            </div>
            <div className='m-5 px-5'>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-2xl'>List Product</h1>
                    {role === "admin" && (
                    <button
                        className="btn btn-primary font-bold"
                        onClick={openAddModal}
                    >
                        Add Product
                    </button>
                    )}
                </div>
                
                
                <ProductList role={role} onEdit={openEditModal} />
            </div>

            {showModal && (
                <ProductFormModal
                mode={formMode}
                initialData={editData || undefined}
                onClose={() => setShowModal(false)}
                onSuccess={() => setShowModal(false)}
                />
            )}
        </div>
        
    )
}