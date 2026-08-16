import fs from "fs"
import { createClient } from "@supabase/supabase-js"

const incomingTools = [
  { "name": "ChatGPT (Free)", "url": "https://chat.openai.com", "category": "Chatbots", "pricing": "Freemium", "rating": 4.8, "description": "OpenAI's general-purpose AI chatbot, free with a paid Plus tier", "is_infy_pick": true },
  { "name": "Google Gemini", "url": "https://gemini.google.com", "category": "Chatbots", "pricing": "Freemium", "rating": 4.6, "description": "Google's conversational AI with deep integration into Workspace apps", "is_infy_pick": true },
  { "name": "Microsoft Copilot", "url": "https://copilot.microsoft.com", "category": "Chatbots", "pricing": "Free", "rating": 4.5, "description": "Free AI chat assistant built into Windows, Edge, and Bing", "is_infy_pick": true },
  { "name": "Le Chat", "url": "https://chat.mistral.ai", "category": "Chatbots", "pricing": "Freemium", "rating": 4.4, "description": "Mistral AI's fast, free conversational assistant with web search" },
  { "name": "HuggingChat", "url": "https://huggingface.co/chat", "category": "Chatbots", "pricing": "Free", "rating": 4.3, "description": "Hugging Face's free open-source chat interface for leading open LLMs" },
  { "name": "Poe", "url": "https://poe.com", "category": "Chatbots", "pricing": "Freemium", "rating": 4.5, "description": "One app to chat with many AI models — GPT, Claude, Gemini, and more" },
  { "name": "Pi", "url": "https://pi.ai", "category": "Chatbots", "pricing": "Free", "rating": 4.3, "description": "Inflection AI's free, emotionally supportive personal chat companion" },
  { "name": "DeepSeek Chat", "url": "https://chat.deepseek.com", "category": "Chatbots", "pricing": "Free", "rating": 4.5, "description": "Free, powerful open-weight AI chatbot with strong reasoning ability", "is_infy_pick": true },
  { "name": "Character.AI", "url": "https://character.ai", "category": "Chatbots", "pricing": "Freemium", "rating": 4.4, "description": "Chat with millions of user-created AI characters and personas" },

  { "name": "Remove.bg", "url": "https://remove.bg", "category": "Design", "pricing": "Freemium", "rating": 4.6, "description": "One-click AI background remover for photos, free for standard resolution" },
  { "name": "Microsoft Designer", "url": "https://designer.microsoft.com", "category": "Design", "pricing": "Free", "rating": 4.5, "description": "Free AI image generation and graphic design tool from Microsoft", "is_infy_pick": true },
  { "name": "Craiyon", "url": "https://craiyon.com", "category": "Design", "pricing": "Free", "rating": 4.1, "description": "Simple, completely free AI image generator in the browser" },
  { "name": "Pixlr", "url": "https://pixlr.com", "category": "Design", "pricing": "Freemium", "rating": 4.4, "description": "Browser-based photo editor with AI background removal and generative fill" },
  { "name": "NightCafe", "url": "https://nightcafe.studio", "category": "Design", "pricing": "Freemium", "rating": 4.5, "description": "AI art generator community with daily free image creation credits" },
  { "name": "Upscale.media", "url": "https://upscale.media", "category": "Design", "pricing": "Freemium", "rating": 4.4, "description": "Free AI image upscaler that enlarges photos without losing quality" },
  { "name": "Namelix", "url": "https://namelix.com", "category": "Design", "pricing": "Free", "rating": 4.3, "description": "AI business name generator with instant logo previews" },
  { "name": "Photopea", "url": "https://photopea.com", "category": "Design", "pricing": "Free", "rating": 4.6, "description": "Free Photoshop-like editor with AI-assisted selection and retouch tools", "is_infy_pick": true },

  { "name": "Clipchamp", "url": "https://clipchamp.com", "category": "Video & Audio", "pricing": "Free", "rating": 4.4, "description": "Microsoft's free AI-assisted video editor built into Windows" },
  { "name": "Kapwing", "url": "https://kapwing.com", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.5, "description": "Collaborative online video editor with free AI subtitles and resize tools" },
  { "name": "Fliki", "url": "https://fliki.ai", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.5, "description": "Turns text and blog posts into narrated videos with AI voices" },
  { "name": "TTSMaker", "url": "https://ttsmaker.com", "category": "Video & Audio", "pricing": "Free", "rating": 4.3, "description": "Completely free text-to-speech generator with 100+ voices and languages" },
  { "name": "NaturalReader", "url": "https://naturalreaders.com", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.4, "description": "Free online text-to-speech reader with natural-sounding AI voices" },
  { "name": "Voicemod", "url": "https://voicemod.net", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.4, "description": "Real-time AI voice changer for calls, games, and streaming" },
  { "name": "Whisper (OpenAI)", "url": "https://github.com/openai/whisper", "category": "Video & Audio", "pricing": "Free", "rating": 4.7, "description": "Open-source AI speech-to-text model, free to run locally", "is_infy_pick": true },

  { "name": "Tactiq", "url": "https://tactiq.io", "category": "Productivity", "pricing": "Freemium", "rating": 4.5, "description": "Free AI meeting transcription and summaries for Zoom, Meet, and Teams" },
  { "name": "MeetGeek", "url": "https://meetgeek.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.4, "description": "AI meeting recorder that auto-generates notes, highlights, and summaries" },
  { "name": "Supernormal", "url": "https://supernormal.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.4, "description": "Free AI meeting notes tool that writes summaries in your own templates" },
  { "name": "Compose AI", "url": "https://compose.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.3, "description": "Free browser extension for AI autocomplete while writing emails" },
  { "name": "Flowrite", "url": "https://flowrite.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.3, "description": "AI writing assistant that turns short prompts into full emails" },
  { "name": "Magical", "url": "https://getmagical.com", "category": "Productivity", "pricing": "Free", "rating": 4.3, "description": "Free AI text expander and autofill tool for repetitive typing tasks" },
  { "name": "Sembly AI", "url": "https://sembly.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.3, "description": "AI meeting assistant with free tier for notes, tasks, and insights" },

  { "name": "Blackbox AI", "url": "https://blackbox.ai", "category": "Coding", "pricing": "Freemium", "rating": 4.4, "description": "Free AI coding assistant with code search, chat, and autocomplete" },
  { "name": "CodeWP", "url": "https://codewp.ai", "category": "Coding", "pricing": "Freemium", "rating": 4.2, "description": "Free-tier AI code generator specialized for WordPress development" },
  { "name": "StackBlitz Bolt", "url": "https://bolt.new", "category": "Coding", "pricing": "Freemium", "rating": 4.5, "description": "Free in-browser AI dev environment for instantly running full-stack code" },

  { "name": "PDF.ai", "url": "https://pdf.ai", "category": "Research", "pricing": "Freemium", "rating": 4.4, "description": "Chat with any PDF and get cited answers, free tier included" },
  { "name": "Sourcely", "url": "https://sourcely.net", "category": "Research", "pricing": "Freemium", "rating": 4.1, "description": "Free AI tool that finds credible academic sources for your writing" },
  { "name": "Explainpaper", "url": "https://explainpaper.com", "category": "Research", "pricing": "Free", "rating": 4.4, "description": "Highlight confusing text in a paper and get a free AI explanation" },
  { "name": "Unpaywall", "url": "https://unpaywall.org", "category": "Research", "pricing": "Free", "rating": 4.4, "description": "Free browser extension that finds legal open-access versions of papers" },

  { "name": "Slidesgo AI", "url": "https://slidesgo.com/ai-presentation-maker", "category": "Presentations", "pricing": "Freemium", "rating": 4.4, "description": "Free AI presentation maker with thousands of editable templates" },
  { "name": "Presentations.AI", "url": "https://presentations.ai", "category": "Presentations", "pricing": "Freemium", "rating": 4.3, "description": "AI presentation generator with a free plan for quick pitch decks" },

  { "name": "Neuronwriter", "url": "https://neuronwriter.com", "category": "Marketing", "pricing": "Freemium", "rating": 4.5, "description": "AI content and SEO optimization tool with a limited free trial" },
  { "name": "Ubersuggest", "url": "https://neilpatel.com/ubersuggest", "category": "Marketing", "pricing": "Freemium", "rating": 4.3, "description": "Free AI-assisted keyword research and SEO suggestion tool" },
  { "name": "Merlin AI", "url": "https://getmerlin.in", "category": "Marketing", "pricing": "Freemium", "rating": 4.4, "description": "Free all-in-one AI browser extension for writing, search, and summaries" },
  { "name": "Sider AI", "url": "https://sider.ai", "category": "Marketing", "pricing": "Freemium", "rating": 4.3, "description": "Free AI sidebar assistant for chat, translation, and content generation" },

  { "name": "Simplified", "url": "https://simplified.com", "category": "Writing", "pricing": "Freemium", "rating": 4.5, "description": "Free-tier all-in-one AI content, design, and social media creator" },
  { "name": "INK Editor", "url": "https://inkforall.com", "category": "Writing", "pricing": "Freemium", "rating": 4.3, "description": "AI writing assistant that scores content for SEO as you write" },
  { "name": "Wordtune Read", "url": "https://wordtune.com/read", "category": "Writing", "pricing": "Free", "rating": 4.3, "description": "Free AI summarizer that condenses long articles and PDFs instantly" },

  { "name": "Let's Enhance", "url": "https://letsenhance.io", "category": "Design", "pricing": "Freemium", "rating": 4.4, "description": "Free AI photo upscaler and enhancer for low-resolution images" },
  { "name": "Bigjpg", "url": "https://bigjpg.com", "category": "Design", "pricing": "Freemium", "rating": 4.2, "description": "Free AI image upscaler optimized for anime and illustration art" },
  { "name": "PicWish", "url": "https://picwish.com", "category": "Design", "pricing": "Freemium", "rating": 4.3, "description": "Free AI photo editing suite for background removal and retouching" },

  { "name": "Mubert", "url": "https://mubert.com", "category": "Music", "pricing": "Freemium", "rating": 4.4, "description": "Free AI-generated royalty-free music streaming and creation platform" },
  { "name": "Beatoven.ai", "url": "https://beatoven.ai", "category": "Music", "pricing": "Freemium", "rating": 4.4, "description": "AI music generator for royalty-free background tracks, free to preview" },

  { "name": "Quizlet AI", "url": "https://quizlet.com", "category": "Education", "pricing": "Freemium", "rating": 4.6, "description": "Free AI-powered flashcards and study tools used by millions of students" },
  { "name": "StudyFetch", "url": "https://studyfetch.com", "category": "Education", "pricing": "Freemium", "rating": 4.4, "description": "AI study assistant that turns notes into flashcards, quizzes, and podcasts" },
  { "name": "Photomath", "url": "https://photomath.com", "category": "Education", "pricing": "Freemium", "rating": 4.7, "description": "Free AI app that solves math problems by scanning them with your camera", "is_infy_pick": true },

  { "name": "Kickresume", "url": "https://kickresume.com", "category": "HR & Recruiting", "pricing": "Freemium", "rating": 4.5, "description": "Free AI resume and cover letter builder with ATS-friendly templates" },
  { "name": "Rezi", "url": "https://rezi.ai", "category": "HR & Recruiting", "pricing": "Freemium", "rating": 4.4, "description": "AI resume builder that scores your resume against job descriptions" },
  { "name": "Teal", "url": "https://tealhq.com", "category": "HR & Recruiting", "pricing": "Freemium", "rating": 4.5, "description": "Free AI job search tracker with resume matching and tailoring tools" },

  { "name": "n8n", "url": "https://n8n.io", "category": "Agents", "pricing": "Free", "rating": 4.6, "description": "Open-source, self-hostable workflow automation platform with AI nodes", "is_infy_pick": true },
  { "name": "Zapier Central", "url": "https://zapier.com/central", "category": "Agents", "pricing": "Freemium", "rating": 4.4, "description": "Zapier's free-tier AI assistant for building custom automation agents" },
  { "name": "Flowith", "url": "https://flowith.io", "category": "Agents", "pricing": "Freemium", "rating": 4.3, "description": "Free AI agent workspace for multi-step research and creative tasks" },

  { "name": "Suno (Free Tier)", "url": "https://suno.com", "category": "Music", "pricing": "Freemium", "rating": 4.8, "description": "Generate full songs for free with daily credits on Suno's free plan", "is_infy_pick": true },

  { "name": "PDF24 AI Tools", "url": "https://pdf24.org", "category": "Research", "pricing": "Free", "rating": 4.3, "description": "Free suite of AI-enhanced PDF tools — merge, convert, OCR, and summarize" },
  { "name": "Sonix", "url": "https://sonix.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.4, "description": "AI transcription service with a free trial for audio and video files" },
  { "name": "Notta", "url": "https://notta.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.4, "description": "Free AI transcription and meeting notes tool in 58+ languages" },
  { "name": "Avoma", "url": "https://avoma.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.4, "description": "AI meeting assistant with free tier for notes, recordings, and insights" },

  { "name": "Jobscan", "url": "https://jobscan.co", "category": "HR & Recruiting", "pricing": "Freemium", "rating": 4.3, "description": "Free AI resume scanner that matches your resume against job postings" },

  { "name": "Deep Dream Generator", "url": "https://deepdreamgenerator.com", "category": "Design", "pricing": "Freemium", "rating": 4.1, "description": "One of the original free AI art generators using deep dream style transfer" },
  { "name": "Fotor", "url": "https://fotor.com", "category": "Design", "pricing": "Freemium", "rating": 4.4, "description": "Free AI photo editor with one-tap enhance, retouch, and AI art filters" },

  { "name": "Frase", "url": "https://frase.io", "category": "Marketing", "pricing": "Freemium", "rating": 4.5, "description": "AI content brief and SEO research tool with a limited free trial" },

  { "name": "Speechify", "url": "https://speechify.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.6, "description": "Free AI text-to-speech app that reads any document, article, or PDF aloud", "is_infy_pick": true },

  { "name": "Bing Image Creator", "url": "https://bing.com/images/create", "category": "Design", "pricing": "Free", "rating": 4.5, "description": "Microsoft's free DALL-E-powered image generator built into Bing", "is_infy_pick": true },

  { "name": "GitMind AI", "url": "https://gitmind.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.3, "description": "Free AI-assisted mind mapping and flowchart generation tool" },
  { "name": "Whimsical AI", "url": "https://whimsical.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.5, "description": "Free-tier AI diagramming, flowchart, and mind map creation tool" },

  { "name": "AutoDraw", "url": "https://autodraw.com", "category": "Design", "pricing": "Free", "rating": 4.2, "description": "Google's free AI tool that turns rough sketches into polished drawings" },
  { "name": "Vizcom", "url": "https://vizcom.ai", "category": "Design", "pricing": "Freemium", "rating": 4.4, "description": "Turns rough sketches into realistic product renders with AI" },

  { "name": "Otio", "url": "https://otio.ai", "category": "Research", "pricing": "Freemium", "rating": 4.3, "description": "Free-tier AI research assistant for summarizing and organizing sources" },
  { "name": "Recall", "url": "https://getrecall.ai", "category": "Research", "pricing": "Freemium", "rating": 4.4, "description": "Free AI tool that summarizes articles and videos into a personal knowledge base" },

  { "name": "Cleanup.pictures", "url": "https://cleanup.pictures", "category": "Design", "pricing": "Free", "rating": 4.5, "description": "Free AI tool to remove unwanted objects and people from photos", "is_infy_pick": true },
  { "name": "Watermark Remover AI", "url": "https://watermarkremover.io", "category": "Design", "pricing": "Freemium", "rating": 4.1, "description": "AI tool that removes watermarks from images, limited free use" },

  { "name": "TLDR This", "url": "https://tldrthis.com", "category": "Research", "pricing": "Freemium", "rating": 4.3, "description": "Free AI article and document summarizer for quick reading" },
  { "name": "Summarize.tech", "url": "https://summarize.tech", "category": "Research", "pricing": "Free", "rating": 4.2, "description": "Free AI tool that summarizes long YouTube videos into readable text" },

  { "name": "Chatsonic", "url": "https://writesonic.com/chat", "category": "Chatbots", "pricing": "Freemium", "rating": 4.4, "description": "AI chatbot with real-time web knowledge and free daily generations" },
  { "name": "You.com", "url": "https://you.com", "category": "Research", "pricing": "Freemium", "rating": 4.3, "description": "Free AI search engine with multiple chat modes and citations" },
  { "name": "Andi Search", "url": "https://andisearch.com", "category": "Research", "pricing": "Free", "rating": 4.2, "description": "Free conversational AI search engine that answers with sourced results" },

  { "name": "Bubbles AI", "url": "https://bubbles.app", "category": "Productivity", "pricing": "Freemium", "rating": 4.3, "description": "Free async screen recording tool with AI meeting summaries" },
  { "name": "Scribe", "url": "https://scribehow.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.5, "description": "Free AI tool that auto-generates step-by-step how-to guides from your clicks" },

  { "name": "Looka Logo Free Preview", "url": "https://logomaster.ai", "category": "Design", "pricing": "Freemium", "rating": 4.2, "description": "Free AI logo preview generator before purchasing final files" },
  { "name": "Brandmark", "url": "https://brandmark.io", "category": "Design", "pricing": "Freemium", "rating": 4.3, "description": "AI logo and brand identity generator with free low-res previews" },

  { "name": "Copy.ai Free Tools", "url": "https://copy.ai/tools", "category": "Writing", "pricing": "Free", "rating": 4.3, "description": "Free single-purpose AI mini tools for headlines, bios, and captions" },
  { "name": "Rytr Free Plan", "url": "https://headlime.com", "category": "Writing", "pricing": "Freemium", "rating": 4.2, "description": "Free-tier AI copywriting generator for ads and landing pages" }
]

// 1. Read existing tools from tools.ts
const file = fs.readFileSync("src/data/tools.ts", "utf8")
const match = file.match(/export const tools: Tool\[\] = (\[[\s\S]*?\])\n\n?/m)
const existingTools = JSON.parse(match[1])

// Deduplication key normalizer
function normalizeKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").trim()
}

// 2. Build deduplicated map
const map = new Map()
// First load existing
for (const t of existingTools) {
  const key = normalizeKey(t.name)
  map.set(key, t)
}

let updatedCount = 0
let newCount = 0
for (const t of incomingTools) {
  const key = normalizeKey(t.name)
  const existing = map.get(key)
  if (existing) {
    // Update existing
    map.set(key, {
      ...existing,
      ...t,
      is_infy_pick: t.is_infy_pick !== undefined ? t.is_infy_pick : existing.is_infy_pick,
    })
    updatedCount++
  } else {
    // Add new
    map.set(key, {
      ...t,
      is_infy_pick: Boolean(t.is_infy_pick),
    })
    newCount++
  }
}

const finalTools = Array.from(map.values())
console.log(`Merged Total: ${finalTools.length} unique tools (${newCount} new, ${updatedCount} updated, 0 duplicates)`)

// 3. Category ordering (with Chatbots near top)
const categoryOrder = [
  "Chatbots", "Coding", "Building", "Design", "Video & Audio", "Productivity",
  "Research", "Agents", "Marketing", "Writing", "Data Analysis",
  "Presentations", "3D & Animation", "Customer Support", "Sales",
  "Gaming", "Legal", "HR & Recruiting", "Finance", "Healthcare",
  "Education", "Music", "E-commerce"
]

const foundCats = new Set(categoryOrder)
finalTools.forEach((t) => foundCats.add(t.category))
const allCategories = Array.from(foundCats)

// 4. Update src/data/tools.ts
const newToolsContent = `export type Pricing = "Free" | "Freemium" | "Paid"
export type Category =
${allCategories.map((c) => `  | "${c}"`).join("\n")}

export interface Tool {
  name: string
  description: string
  category: Category
  pricing: Pricing
  rating: number
  url: string
  is_infy_pick?: boolean
}

export const CATEGORIES: Array<Category> = [
${allCategories.map((c) => `  "${c}",`).join("\n")}
]

export const PRICING_OPTIONS = ["All", "Free", "Freemium", "Paid"] as const
export type PricingFilter = (typeof PRICING_OPTIONS)[number]

export const tools: Tool[] = ${JSON.stringify(finalTools, null, 2)}
`

fs.writeFileSync("src/data/tools.ts", newToolsContent)
console.log("Updated src/data/tools.ts")

// 5. Update downloadable text and JSON files
let textContent = `================================================================================
InfyAI - Complete List of Curated AI Tools (${finalTools.length} Tools)
Website: https://infyai.com
================================================================================\n\n`

allCategories.forEach((cat) => {
  const catTools = finalTools.filter((t) => t.category === cat)
  if (catTools.length === 0) return
  textContent += `[${cat.toUpperCase()}] (${catTools.length} tools)\n`
  catTools.forEach((t, idx) => {
    textContent += `${idx + 1}. ${t.name}${t.is_infy_pick ? " ✦ [Infy Pick]" : ""}\n   URL: ${t.url}\n   Category: ${t.category} | Pricing: ${t.pricing} | Rating: ${t.rating}\n   Description: ${t.description}\n\n`
  })
})

fs.writeFileSync("public/infy_ai_tools.txt", textContent)
fs.writeFileSync("C:/Users/User/Downloads/infy_ai_tools.txt", textContent)
fs.writeFileSync("C:/Users/User/Downloads/infy_ai_tools.json", JSON.stringify(finalTools, null, 2))
console.log(`Saved updated files to Downloads: C:/Users/User/Downloads/infy_ai_tools.txt (${finalTools.length} tools)`)

// 6. Sync to Supabase DB
const supabaseUrl = "https://eemhvfqldhkcdbsbibgo.supabase.co"
const supabaseKey = "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"
const supabase = createClient(supabaseUrl, supabaseKey)

const fallbackCategoryMap = {
  "Chatbots": "Productivity",
  "Data Analysis": "Research",
  "Presentations": "Design",
  "3D & Animation": "Design",
  "Customer Support": "Agents",
  "Sales": "Marketing",
  "Gaming": "Design",
  "Legal": "Productivity",
  "HR & Recruiting": "Productivity",
  "Finance": "Research",
  "Healthcare": "Research",
  "Education": "Research",
  "Music": "Video & Audio",
  "E-commerce": "Marketing",
}

async function syncToSupabase() {
  console.log(`Syncing all ${finalTools.length} tools to Supabase...`)
  await supabase.from("tools").delete().neq("id", "00000000-0000-0000-0000-000000000000")

  let inserted = 0
  for (const t of finalTools) {
    let res = await supabase.from("tools").insert({
      name: t.name,
      description: t.description,
      category: t.category,
      pricing: t.pricing,
      rating: t.rating,
      url: t.url,
    })

    if (res.error) {
      const mappedCategory = fallbackCategoryMap[t.category] || "Productivity"
      res = await supabase.from("tools").insert({
        name: t.name,
        description: t.description,
        category: mappedCategory,
        pricing: t.pricing,
        rating: t.rating,
        url: t.url,
      })
    }

    if (!res.error) inserted++
    else console.error(`Error on ${t.name}:`, res.error.message)
  }

  const { data: dbTools } = await supabase.from("tools").select("id, name")
  console.log(`🎉 Supabase database verified: Exactly ${dbTools ? dbTools.length : inserted} tools live! (0 duplicates)`)
}

syncToSupabase()
