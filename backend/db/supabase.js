import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY } from '../utils/config.js';
export const supabase = createClient('https://xyzcompany.supabase.co',SUPABASE_ANON_KEY);