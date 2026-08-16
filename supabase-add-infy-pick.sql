-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- Project -> SQL Editor -> New Query -> Paste & Run

-- 1. Add the is_infy_pick column to tools table
ALTER TABLE tools ADD COLUMN IF NOT EXISTS is_infy_pick BOOLEAN DEFAULT FALSE;

-- 2. Mark the top popular free tools as Infy Picks
UPDATE tools 
SET is_infy_pick = TRUE 
WHERE LOWER(name) IN (
  'aider',
  'openhands',
  'continue',
  'codeium',
  'streamlit',
  'playground ai',
  'capcut ai',
  'goblin.tools',
  'fathom',
  'notebooklm',
  'arc search',
  'chatpdf',
  'semantic scholar',
  'crewai',
  'autogpt',
  'deepl write',
  'luma genie',
  'apollo.io',
  'tidio ai'
);
