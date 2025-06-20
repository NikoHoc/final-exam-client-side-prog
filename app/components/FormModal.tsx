"use client";

import { useEffect, useState } from "react";
import { addProduct, updateProduct } from "../lib/productApi";
import Swal from "sweetalert2";

interface Product {
  id: number;
  created_at: string;
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
}

interface Props {
  mode: "add" | "edit";
  initialData?: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductFormModal({ mode, initialData, onClose, onSuccess }: Props) {
  const [nama_produk, setNamaProduk] = useState("");
  const [harga_satuan, setHargaSatuan] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setNamaProduk(initialData.nama_produk);
      setHargaSatuan(initialData.harga_satuan);
      setQuantity(initialData.quantity);
    } else {
      setNamaProduk("");
      setHargaSatuan(0);
      setQuantity(0);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nama_produk,
      harga_satuan,
      quantity,
    };

    if (mode === "add") {
      const { error } = await addProduct(data);
      if (!error) {
        Swal.fire("Success", "Product added!", "success").then(() => {
            onSuccess();
            onClose();
            window.location.reload(); 
        });
       }
    } else if (mode === "edit" && initialData) {
      const { error } = await updateProduct(initialData.id, data);
      if (!error) {
        Swal.fire("Success", "Product added!", "success").then(() => {
            onSuccess();
            onClose();
            window.location.reload(); 
        });
      }
    }
  };

  return (
    <dialog id="form-modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{mode === "add" ? "Add Product" : "Edit Product"}</h3>
        <form onSubmit={handleSubmit} className="py-4 space-y-3">
          <input
            type="text"
            placeholder="Nama Produk"
            className="input input-bordered w-full"
            value={nama_produk}
            onChange={(e) => setNamaProduk(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Harga Satuan"
            className="input input-bordered w-full"
            value={harga_satuan}
            onChange={(e) => setHargaSatuan(Number(e.target.value))}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            className="input input-bordered w-full"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {mode === "add" ? "Add" : "Update"}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
