-- API Keys table schema for Supabase
-- Run this SQL in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  usage_limit INTEGER DEFAULT 100,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes for performance
  CONSTRAINT api_keys_user_id_name_unique UNIQUE (user_id, name)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys (user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_api_key ON api_keys (api_key);
CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys (status);
CREATE INDEX IF NOT EXISTS idx_api_keys_created_at ON api_keys (created_at DESC);

-- RLS (Row Level Security) policies
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Users can only see their own API keys
CREATE POLICY "Users can view their own API keys" ON api_keys
  FOR SELECT USING (user_id = auth.jwt() ->> 'sub');

-- Users can only insert their own API keys
CREATE POLICY "Users can create their own API keys" ON api_keys
  FOR INSERT WITH CHECK (user_id = auth.jwt() ->> 'sub');

-- Users can only update their own API keys
CREATE POLICY "Users can update their own API keys" ON api_keys
  FOR UPDATE USING (user_id = auth.jwt() ->> 'sub');

-- Users can only delete their own API keys
CREATE POLICY "Users can delete their own API keys" ON api_keys
  FOR DELETE USING (user_id = auth.jwt() ->> 'sub');

-- Function to increment usage count
CREATE OR REPLACE FUNCTION increment_usage(key TEXT)
RETURNS INTEGER AS $$
BEGIN
  UPDATE api_keys 
  SET usage_count = usage_count + 1,
      last_used_at = NOW()
  WHERE api_key = key;
  
  RETURN (SELECT usage_count FROM api_keys WHERE api_key = key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 