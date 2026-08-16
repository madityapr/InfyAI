import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://eemhvfqldhkcdbsbibgo.supabase.co"
const supabaseKey = "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"

const supabase = createClient(supabaseUrl, supabaseKey)

const tools = [
  { name: "Aider", url: "https://aider.chat", category: "Coding", rating: 4.9, pricing: "Free", description: "AI pair programming directly in your terminal and git repository" },
  { name: "Cursor", url: "https://cursor.com", category: "Coding", rating: 4.8, pricing: "Freemium", description: "AI-first code editor built on VS Code for 10x developer productivity" },
  { name: "Codeium", url: "https://codeium.com", category: "Coding", rating: 4.7, pricing: "Free", description: "Free AI code acceleration and autocomplete for individual developers" },
  { name: "Continue", url: "https://continue.dev", category: "Coding", rating: 4.8, pricing: "Free", description: "Open-source AI coding assistant inside VS Code and JetBrains" },
  { name: "Bolt.new", url: "https://bolt.new", category: "Building", rating: 4.9, pricing: "Freemium", description: "Prompt, build, and deploy full-stack web applications in the browser" },
  { name: "Lovable", url: "https://lovable.dev", category: "Building", rating: 4.8, pricing: "Freemium", description: "Full-stack AI app builder that turns natural language into production code" },
  { name: "v0", url: "https://v0.dev", category: "Building", rating: 4.9, pricing: "Freemium", description: "Vercel's generative UI tool that creates clean React and Tailwind components" },
  { name: "Relume", url: "https://relume.io", category: "Building", rating: 4.8, pricing: "Freemium", description: "Generate complete sitemaps and wireframes for websites in seconds" },
  { name: "Framer AI", url: "https://framer.com", category: "Building", rating: 4.6, pricing: "Freemium", description: "Design and publish responsive, modern websites with AI layout assistance" },
  { name: "Dora", url: "https://dora.run", category: "Building", rating: 4.5, pricing: "Freemium", description: "Design 3D and animated websites without writing code using AI" },
  { name: "Webflow AI", url: "https://webflow.com", category: "Building", rating: 4.6, pricing: "Freemium", description: "AI-powered web design, content generation, and styling in Webflow" },
  { name: "Midjourney", url: "https://midjourney.com", category: "Design", rating: 4.9, pricing: "Paid", description: "State-of-the-art AI image generation and photorealistic visual art" },
  { name: "Leonardo.ai", url: "https://leonardo.ai", category: "Design", rating: 4.7, pricing: "Freemium", description: "Create production-ready game assets, concept art, and illustrations" },
  { name: "Krea", url: "https://krea.ai", category: "Design", rating: 4.8, pricing: "Freemium", description: "Real-time AI image generation, upscaling, and pattern generation" },
  { name: "Magnific", url: "https://magnific.ai", category: "Design", rating: 4.7, pricing: "Paid", description: "AI image upscaler and enhancer that hallucinates incredible high detail" },
  { name: "Recraft", url: "https://recraft.ai", category: "Design", rating: 4.8, pricing: "Freemium", description: "AI vector graphic and 3D icon generator for professional designers" },
  { name: "Photoroom", url: "https://photoroom.com", category: "Design", rating: 4.6, pricing: "Freemium", description: "Automatic AI background removal, product photography, and object erasing" },
  { name: "Canva Magic Studio", url: "https://canva.com", category: "Design", rating: 4.8, pricing: "Freemium", description: "All-in-one AI design tools for social posts, slides, and branding" },
  { name: "Runway", url: "https://runwayml.com", category: "Video & Audio", rating: 4.7, pricing: "Freemium", description: "Next-gen AI video generation (Gen-3 Alpha) and multimodal VFX tools" },
  { name: "Pika", url: "https://pika.art", category: "Video & Audio", rating: 4.6, pricing: "Freemium", description: "Idea-to-video platform that turns text and images into dynamic 3D scenes" },
  { name: "Luma Dream Machine", url: "https://lumalabs.ai/dream-machine", category: "Video & Audio", rating: 4.8, pricing: "Freemium", description: "High-fidelity AI video model creating realistic motion and camera moves" },
  { name: "Kling AI", url: "https://klingai.com", category: "Video & Audio", rating: 4.8, pricing: "Freemium", description: "Advanced cinematic video generation model with physical simulation" },
  { name: "ElevenLabs", url: "https://elevenlabs.io", category: "Video & Audio", rating: 4.9, pricing: "Freemium", description: "Ultra-realistic voice synthesis, voice cloning, and AI dubbing in 30+ languages" },
  { name: "Suno", url: "https://suno.com", category: "Video & Audio", rating: 4.8, pricing: "Freemium", description: "Generate full radio-ready songs with vocals and instruments from a prompt" },
  { name: "Udio", url: "https://udio.com", category: "Video & Audio", rating: 4.8, pricing: "Freemium", description: "Create studio-quality music tracks with lyrics across any music genre" },
  { name: "HeyGen", url: "https://heygen.com", category: "Video & Audio", rating: 4.7, pricing: "Freemium", description: "AI video generator with photorealistic digital avatars and translation" },
  { name: "Descript", url: "https://descript.com", category: "Video & Audio", rating: 4.6, pricing: "Freemium", description: "All-in-one video and podcast editor as simple as editing a text doc" },
  { name: "Opus Clip", url: "https://opus.pro", category: "Video & Audio", rating: 4.7, pricing: "Freemium", description: "Turn long YouTube videos into viral short clips for TikTok and Reels" },
  { name: "Notion AI", url: "https://notion.so", category: "Productivity", rating: 4.7, pricing: "Freemium", description: "AI writing assistant, summarizer, and Q&A engine inside Notion" },
  { name: "Taskade", url: "https://taskade.com", category: "Productivity", rating: 4.6, pricing: "Freemium", description: "AI agents, task management, and collaborative mind mapping" },
  { name: "Otter.ai", url: "https://otter.ai", category: "Productivity", rating: 4.6, pricing: "Freemium", description: "Real-time meeting notes, audio transcription, and AI summary insights" },
  { name: "Fireflies.ai", url: "https://fireflies.ai", category: "Productivity", rating: 4.7, pricing: "Freemium", description: "Automate meeting notes, transcribe voice calls, and search conversations" },
  { name: "Fathom", url: "https://fathom.video", category: "Productivity", rating: 4.8, pricing: "Free", description: "Free AI meeting assistant that records, transcribes, and summarizes Zoom calls" },
  { name: "Superhuman AI", url: "https://superhuman.com", category: "Productivity", rating: 4.7, pricing: "Paid", description: "AI-powered email client designed to help you hit Inbox Zero in half the time" },
  { name: "Raycast AI", url: "https://raycast.com", category: "Productivity", rating: 4.9, pricing: "Freemium", description: "Supercharged Mac launcher with ChatGPT and Claude built into your desktop" },
  { name: "Mem.ai", url: "https://mem.ai", category: "Productivity", rating: 4.4, pricing: "Freemium", description: "Self-organizing workspace that connects your thoughts and notes with AI" },
  { name: "SciSpace", url: "https://typeset.io", category: "Research", rating: 4.8, pricing: "Freemium", description: "AI research assistant to explain complex scientific papers and equations" },
  { name: "ChatPDF", url: "https://chatpdf.com", category: "Research", rating: 4.6, pricing: "Free", description: "Chat with any PDF document, research paper, or textbook using AI" },
  { name: "NotebookLM", url: "https://notebooklm.google.com", category: "Research", rating: 4.9, pricing: "Free", description: "Google's AI notebook that grounds analysis in your notes and audio discussions" },
  { name: "Arc Search", url: "https://arc.net", category: "Research", rating: 4.8, pricing: "Free", description: "Browse for me AI search engine that reads webpages and creates summaries" },
  { name: "AutoGPT", url: "https://autogpt.net", category: "Agents", rating: 4.5, pricing: "Free", description: "Open-source autonomous AI agent framework executing complex multi-step tasks" },
  { name: "CrewAI", url: "https://crewai.com", category: "Agents", rating: 4.8, pricing: "Free", description: "Framework for orchestrating autonomous AI agent role-playing teams" },
  { name: "Multion", url: "https://multion.ai", category: "Agents", rating: 4.6, pricing: "Freemium", description: "Next-gen AI web browser agent that takes actions and navigates for you" },
  { name: "AgentGPT", url: "https://agentgpt.reworkd.ai", category: "Agents", rating: 4.5, pricing: "Freemium", description: "Assemble, configure, and deploy autonomous AI agents directly in the browser" },
  { name: "Devin", url: "https://cognition.ai", category: "Agents", rating: 4.9, pricing: "Paid", description: "The world's first fully autonomous AI software engineer by Cognition" },
  { name: "Mutiny", url: "https://mutinyhq.com", category: "Marketing", rating: 4.6, pricing: "Paid", description: "No-code AI personalization platform to convert 2x more website visitors" },
  { name: "Surfer SEO", url: "https://surferseo.com", category: "Marketing", rating: 4.7, pricing: "Paid", description: "Data-driven SEO content editor that helps articles rank #1 on Google" },
  { name: "Anyword", url: "https://anyword.com", category: "Marketing", rating: 4.5, pricing: "Freemium", description: "Performance copywriting AI that predicts engagement scores before publishing" },
  { name: "Taplio", url: "https://taplio.com", category: "Marketing", rating: 4.6, pricing: "Paid", description: "All-in-one AI tool to grow and monetize your personal brand on LinkedIn" },
  { name: "Jasper", url: "https://jasper.ai", category: "Writing", rating: 4.5, pricing: "Paid", description: "Enterprise AI writing platform with custom brand voice and style guides" },
  { name: "Copy.ai", url: "https://copy.ai", category: "Writing", rating: 4.6, pricing: "Freemium", description: "AI copywriter for blog posts, email campaigns, and marketing collateral" },
  { name: "Writesonic", url: "https://writesonic.com", category: "Writing", rating: 4.5, pricing: "Freemium", description: "AI article writer and SEO content generation platform" },
  { name: "Sudowrite", url: "https://sudowrite.com", category: "Writing", rating: 4.8, pricing: "Paid", description: "AI fiction and creative writing companion for novel authors and screenwriters" },
  { name: "QuillBot", url: "https://quillbot.com", category: "Writing", rating: 4.7, pricing: "Freemium", description: "AI paraphraser, grammar checker, and text summarizer for clear writing" },
  { name: "Lex", url: "https://lex.page", category: "Writing", rating: 4.7, pricing: "Freemium", description: "Modern AI-native word processor with smart feedback and autocomplete" },
  { name: "Julius AI", url: "https://julius.ai", category: "Data Analysis", rating: 4.8, pricing: "Freemium", description: "Chat with your data, generate Python charts, and perform statistical analysis" },
  { name: "Rose AI", url: "https://rose.ai", category: "Data Analysis", rating: 4.6, pricing: "Freemium", description: "Cloud data platform for finding, cleaning, and visualizing financial data" },
  { name: "Akkio", url: "https://akkio.com", category: "Data Analysis", rating: 4.5, pricing: "Paid", description: "Generative analytics and predictive machine learning platform for businesses" },
  { name: "Polymer", url: "https://polymersearch.com", category: "Data Analysis", rating: 4.5, pricing: "Freemium", description: "No-code AI business intelligence tool that turns spreadsheets into dashboards" },
  { name: "Tome", url: "https://tome.app", category: "Presentations", rating: 4.6, pricing: "Freemium", description: "Generative storytelling platform that turns ideas into interactive pitch decks" },
  { name: "Gamma", url: "https://gamma.app", category: "Presentations", rating: 4.8, pricing: "Freemium", description: "Generate polished presentations, docs, and web pages from text prompts" },
  { name: "Beautiful.ai", url: "https://beautiful.ai", category: "Presentations", rating: 4.7, pricing: "Paid", description: "Smart presentation software with AI slide layouts that adapt automatically" },
  { name: "Pitch", url: "https://pitch.com", category: "Presentations", rating: 4.6, pricing: "Freemium", description: "Collaborative presentation software with AI-assisted slide creation" },
  { name: "Luma Genie", url: "https://lumalabs.ai/genie", category: "3D & Animation", rating: 4.7, pricing: "Free", description: "Generate detailed 3D models and textures from text prompts in seconds" },
  { name: "Meshy", url: "https://meshy.ai", category: "3D & Animation", rating: 4.6, pricing: "Freemium", description: "3D generative AI tool for converting text and 2D images into 3D assets" },
  { name: "Tripo3D", url: "https://tripo3d.ai", category: "3D & Animation", rating: 4.5, pricing: "Freemium", description: "Fast AI 3D model generator for game developers and 3D printing" },
  { name: "Chatbase", url: "https://chatbase.co", category: "Customer Support", rating: 4.7, pricing: "Freemium", description: "Custom ChatGPT bot trained on your website data and documents for support" },
  { name: "Dante AI", url: "https://dante-ai.com", category: "Customer Support", rating: 4.6, pricing: "Freemium", description: "Zero-code custom AI chatbots trained on your business knowledge base" },
  { name: "Clay", url: "https://clay.com", category: "Sales", rating: 4.9, pricing: "Freemium", description: "Automate outbound prospecting with 50+ data providers and AI research agents" },
  { name: "Lavender", url: "https://lavender.ai", category: "Sales", rating: 4.8, pricing: "Freemium", description: "AI sales email coach that scores emails and helps get more replies" },
  { name: "Reply.io", url: "https://reply.io", category: "Sales", rating: 4.5, pricing: "Freemium", description: "AI sales engagement platform that automates multichannel cold outreach" },
]

async function syncTools() {
  console.log(`Starting sync of ${tools.length} tools to Supabase...`)

  // 1. Delete all existing tools first so we have clean fresh data
  const { error: deleteError } = await supabase
    .from("tools")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000")

  if (deleteError) {
    console.log("Delete notice:", deleteError.message)
  }

  // 2. Insert all 71 tools in batches
  const batchSize = 25
  let inserted = 0

  for (let i = 0; i < tools.length; i += batchSize) {
    const batch = tools.slice(i, i + batchSize)
    const { data, error } = await supabase.from("tools").insert(batch)
    if (error) {
      console.error(`Batch error at ${i}:`, error.message)
    } else {
      inserted += batch.length
      console.log(`Inserted batch: ${inserted}/${tools.length}`)
    }
  }

  // 3. Verify total count in Supabase
  const { data: allTools } = await supabase
    .from("tools")
    .select("id, name, category")

  console.log(`\n🎉 Success: ${allTools ? allTools.length : inserted} tools are now live in your Supabase database!`)
}

syncTools()
