// Re-export client for backward compatibility
export { createClient } from './supabase/client'

// Create a singleton instance
import { createClient as createBrowserClient } from './supabase/client'
export const supabase = createBrowserClient()
