// components/ProductList.tsx
"use client";

import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../lib/productApi";
import Swal from "sweetalert2";

interface Product {
  id: number;
  created_at: string;
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
}

interface ProductListProps {
  role: string | null;
  onEdit: (product: Product) => void;
}

export default function ProductList({ role, onEdit }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    const { data, error } = await getProducts();
    if (!error && data) setProducts(data);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await deleteProduct(id);
      Swal.fire("Success", "Product deleted!", "success");
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Created At</th>
            <th>Nama Produk</th>
            <th>Harga Satuan</th>
            <th>Quantity</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{new Date(product.created_at).toLocaleString()}</td>
              <td>{product.nama_produk}</td>
              <td>{product.harga_satuan}</td>
              <td>{product.quantity}</td>
              {role === "admin" && (
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}