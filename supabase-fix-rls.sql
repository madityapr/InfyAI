-- ============================================================
-- RUN THIS IN SUPABASE SQL EDITOR TO FIX PERMISSIONS
-- ============================================================

-- Drop restrictive policies
DROP POLICY IF EXISTS "Admin can manage tools" ON tools;
DROP POLICY IF EXISTS "Admin can read subscribers" ON subscribers;

-- Allow anon key to do everything on tools (app handles auth)
CREATE POLICY "Anyone can manage tools" ON tools
  FOR ALL USING (true) WITH CHECK (true);

-- Allow anon key to read subscribers (app handles admin auth)  
CREATE POLICY "Anyone can read subscribers" ON subscribers
  FOR SELECT USING (true);

-- Allow anon key to update subscribers (for unsubscribe)
CREATE POLICY "Anyone can update subscribers" ON subscribers
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow anon key to delete subscribers
CREATE POLICY "Anyone can delete subscribers" ON subscribers
  FOR DELETE USING (true);
