import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,  // REQUIRED for Google OAuth callback
    flowType: 'pkce'           // REQUIRED for secure OAuth with Vite
  }
})

/* SUPABASE SCHEMA
-- profiles: id, email, full_name, avatar_url, created_at
-- products: id, name, price, original_price, image, 
             rating, review_count, category, tags, 
             is_featured, badge, in_stock
-- problems: id, title, short_desc, long_desc, icon, 
             tags, trending, difficulty
-- wishlist: id, user_id, product_id, created_at
*/
