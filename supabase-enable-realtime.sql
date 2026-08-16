-- Run this once in your Supabase SQL Editor if Realtime is not yet enabled on the tools table
-- Project -> SQL Editor -> New Query -> Paste & Run

-- 1. Enable Realtime replication for the tools table
ALTER PUBLICATION supabase_realtime ADD TABLE tools;

-- 2. Verify Realtime is enabled
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
