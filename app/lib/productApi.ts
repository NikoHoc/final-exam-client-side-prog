import { supabase } from './supabaseClient';

export async function getProducts() {
  return supabase.from('products').select('*').order('created_at', { ascending: false });
}

export async function addProduct(data: any) {
  return supabase.from('products').insert(data);
}

export async function updateProduct(id: number, data: any) {
  return supabase.from('products').update(data).eq('id', id);
}

export async function deleteProduct(id: number) {
  return supabase.from('products').delete().eq('id', id);
}
