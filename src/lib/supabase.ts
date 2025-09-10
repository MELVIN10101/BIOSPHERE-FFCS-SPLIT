import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mbfmreoopawjcahftyux.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mbfmreoopawjcahftyux'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Student {
  id?: string
  name: string
  reg_no: string
  email: string
  phone: string
  department: string
  created_at?: string
}