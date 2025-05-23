import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface APIKey {
  id: string
  api_key: string
  user_id: string
  name: string
  usage_count: number
  usage_limit: number
  status: 'active' | 'inactive'
  created_at: string
  last_used_at: string | null
}

export interface CreateAPIKeyRequest {
  name: string
  user_id: string
  usage_limit?: number
} 