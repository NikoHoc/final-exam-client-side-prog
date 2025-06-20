import { supabase } from './supabaseClient';

interface ProductData {
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
}

export async function getProducts() {
  return supabase.from('products').select('*').order('created_at', { ascending: false });
}

export async function addProduct(data: ProductData) {
  return supabase.from('products').insert(data);
}

export async function updateProduct(id: number, data: ProductData) {
  return supabase.from('products').update(data).eq('id', id);
}

export async function deleteProduct(id: number) {
  return supabase.from('products').delete().eq('id', id);
}