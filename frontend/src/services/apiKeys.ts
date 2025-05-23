import { supabase, APIKey, CreateAPIKeyRequest } from '@/lib/supabase'
import { nanoid } from 'nanoid'

// Generate a secure API key
const generateAPIKey = (): string => {
  const prefix = 'gd_'
  const randomPart = nanoid(40) // 40 character random string
  return `${prefix}${randomPart}`
}

// Create a new API key
export const createAPIKey = async (request: CreateAPIKeyRequest): Promise<{ apiKey: APIKey; fullKey: string }> => {
  const fullKey = generateAPIKey()
  
  const newAPIKey = {
    api_key: fullKey,
    user_id: request.user_id,
    name: request.name,
    usage_count: 0,
    usage_limit: request.usage_limit || 100, // Default limit for free tier
    status: 'active' as const,
    last_used_at: null
  }

  const { data, error } = await supabase
    .from('api_keys')
    .insert([newAPIKey])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create API key: ${error.message}`)
  }

  return {
    apiKey: data,
    fullKey
  }
}

// Get all API keys for a user
export const getUserAPIKeys = async (userId: string): Promise<APIKey[]> => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch API keys: ${error.message}`)
  }

  return data || []
}

// Delete an API key
export const deleteAPIKey = async (keyId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', keyId)
    .eq('user_id', userId) // Ensure user can only delete their own keys

  if (error) {
    throw new Error(`Failed to delete API key: ${error.message}`)
  }
}

// Update API key usage
export const updateAPIKeyUsage = async (apiKey: string): Promise<void> => {
  const { error } = await supabase
    .from('api_keys')
    .update({ 
      usage_count: supabase.rpc('increment_usage', { key: apiKey }),
      last_used_at: new Date().toISOString()
    })
    .eq('api_key', apiKey)

  if (error) {
    throw new Error(`Failed to update API key usage: ${error.message}`)
  }
}

// Validate API key and check limits
export const validateAPIKey = async (apiKey: string): Promise<{ valid: boolean; key?: APIKey; error?: string }> => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('api_key', apiKey)
    .eq('status', 'active')
    .single()

  if (error || !data) {
    return { valid: false, error: 'Invalid API key' }
  }

  if (data.usage_count >= data.usage_limit) {
    return { valid: false, error: 'API key usage limit exceeded' }
  }

  return { valid: true, key: data }
} 