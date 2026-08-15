-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- Go to: Project → SQL Editor → New Query → Paste this → Run

-- ── Tools table ──
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Research', 'Writing', 'Design', 'Building',
    'Productivity', 'Agents', 'Marketing', 'Video & Audio', 'Coding'
  )),
  pricing TEXT NOT NULL CHECK (pricing IN ('Free', 'Freemium', 'Paid')),
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.0 CHECK (rating >= 0 AND rating <= 5),
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Subscribers table ──
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- ── Row Level Security ──
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public can read tools
CREATE POLICY "Anyone can read tools" ON tools
  FOR SELECT USING (true);

-- Public can insert subscribers (subscribe)
CREATE POLICY "Anyone can subscribe" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything on tools
CREATE POLICY "Admin can manage tools" ON tools
  FOR ALL USING (auth.role() = 'authenticated');

-- Authenticated users (admin) can read subscribers
CREATE POLICY "Admin can read subscribers" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- ── Auto-update updated_at ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Seed initial tools data ──
INSERT INTO tools (name, description, category, pricing, rating, url) VALUES
  ('Perplexity AI', 'AI-powered search with real-time web access and cited sources', 'Research', 'Freemium', 4.8, 'https://perplexity.ai'),
  ('Consensus', 'Search and extract insights from 200M+ scientific papers', 'Research', 'Freemium', 4.5, 'https://consensus.app'),
  ('Semantic Scholar', 'Free academic search engine powered by AI from the Allen Institute', 'Research', 'Free', 4.6, 'https://semanticscholar.org'),
  ('Elicit', 'AI research assistant that automates literature review workflows', 'Research', 'Freemium', 4.4, 'https://elicit.com'),
  ('Claude', 'Anthropic''s AI assistant for analysis, writing, coding, and reasoning', 'Writing', 'Freemium', 4.9, 'https://claude.ai'),
  ('ChatGPT', 'OpenAI''s flagship conversational AI for any task you can imagine', 'Writing', 'Freemium', 4.7, 'https://chatgpt.com'),
  ('Gamma', 'Generate polished presentations, documents, and webpages with AI', 'Writing', 'Freemium', 4.6, 'https://gamma.app'),
  ('Writesonic', 'AI writer for long-form blogs, ads, and product descriptions at scale', 'Writing', 'Freemium', 4.3, 'https://writesonic.com'),
  ('Midjourney', 'Generate cinematic, high-quality artwork from natural language prompts', 'Design', 'Paid', 4.8, 'https://midjourney.com'),
  ('Stable Diffusion', 'Open-source AI image generation model you can run locally or in the cloud', 'Design', 'Free', 4.6, 'https://stability.ai'),
  ('Beautiful.ai', 'AI-powered slide design that keeps presentations pixel-perfect automatically', 'Design', 'Freemium', 4.4, 'https://beautiful.ai'),
  ('Adobe Firefly', 'Generative AI image tools built directly into the Adobe Creative Suite', 'Design', 'Freemium', 4.5, 'https://firefly.adobe.com'),
  ('v0 by Vercel', 'Generate and iterate on production-ready UI components from a prompt', 'Building', 'Freemium', 4.7, 'https://v0.dev'),
  ('Framer AI', 'Design and publish responsive websites with AI layout assistance', 'Building', 'Freemium', 4.6, 'https://framer.com'),
  ('Bolt', 'Full-stack web apps generated from a prompt and deployed instantly', 'Building', 'Freemium', 4.5, 'https://bolt.new'),
  ('Notion AI', 'AI writing, summarization, and Q&A built into your Notion workspace', 'Productivity', 'Freemium', 4.5, 'https://notion.so/product/ai'),
  ('Otter.ai', 'Real-time meeting transcription, summaries, and action item extraction', 'Productivity', 'Freemium', 4.5, 'https://otter.ai'),
  ('Zapier AI', 'Build AI-powered workflow automations across 7,000+ apps without code', 'Productivity', 'Freemium', 4.4, 'https://zapier.com/ai'),
  ('AutoGPT', 'Open-source autonomous AI agent that self-directs to complete long tasks', 'Agents', 'Free', 4.2, 'https://agpt.co'),
  ('AgentGPT', 'Deploy autonomous AI agents in your browser with no local setup required', 'Agents', 'Freemium', 4.1, 'https://agentgpt.reworkd.ai'),
  ('Copy.ai', 'Generate marketing copy, product descriptions, and ad creative at scale', 'Marketing', 'Freemium', 4.4, 'https://copy.ai'),
  ('Jasper', 'Enterprise AI content platform with brand voice controls for teams', 'Marketing', 'Paid', 4.3, 'https://jasper.ai'),
  ('AdCreative.ai', 'Generate conversion-focused ad creatives and banners from your brand assets', 'Marketing', 'Freemium', 4.2, 'https://adcreative.ai'),
  ('Runway ML', 'Professional AI video generation, editing, and visual effects for creators', 'Video & Audio', 'Freemium', 4.6, 'https://runwayml.com'),
  ('ElevenLabs', 'Ultra-realistic AI voice synthesis, cloning, and dubbing in 30+ languages', 'Video & Audio', 'Freemium', 4.8, 'https://elevenlabs.io'),
  ('Suno AI', 'Generate complete, high-quality songs with vocals from a text prompt', 'Video & Audio', 'Freemium', 4.7, 'https://suno.ai'),
  ('GitHub Copilot', 'AI pair programmer that autocompletes code and suggests whole functions', 'Coding', 'Freemium', 4.7, 'https://github.com/features/copilot'),
  ('Cursor', 'AI-first code editor built on VS Code for dramatically faster development', 'Coding', 'Freemium', 4.8, 'https://cursor.com'),
  ('Tabnine', 'Privacy-first AI code completion that runs locally or in the cloud', 'Coding', 'Freemium', 4.4, 'https://tabnine.com')
ON CONFLICT DO NOTHING;
