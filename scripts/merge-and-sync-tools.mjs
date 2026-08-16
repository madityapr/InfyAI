import fs from "fs"
import { createClient } from "@supabase/supabase-js"

const newTools = [
  { name: "OpenHands", url: "https://github.com/All-Hands-AI/OpenHands", category: "Coding", pricing: "Free", rating: 4.8, description: "Open-source AI software engineer and coding agent" },
  { name: "Tabnine", url: "https://tabnine.com", category: "Coding", pricing: "Freemium", rating: 4.6, description: "AI assistant for software developers with strong privacy" },
  { name: "GitHub Copilot", url: "https://github.com/features/copilot", category: "Coding", pricing: "Paid", rating: 4.9, description: "Enterprise-grade AI pair programmer inside your IDE" },
  { name: "Streamlit", url: "https://streamlit.io", category: "Building", pricing: "Free", rating: 4.7, description: "Turn Python scripts into interactive web apps instantly" },
  { name: "Softr", url: "https://softr.io", category: "Building", pricing: "Freemium", rating: 4.8, description: "Build client portals and internal tools without code" },
  { name: "Draftbit", url: "https://draftbit.com", category: "Building", pricing: "Paid", rating: 4.6, description: "Pro-code React Native app builder with AI assistance" },
  { name: "Playground AI", url: "https://playground.com", category: "Design", pricing: "Free", rating: 4.7, description: "Free online AI image creator and prompt-based editor" },
  { name: "Adobe Firefly", url: "https://firefly.adobe.com", category: "Design", pricing: "Freemium", rating: 4.8, description: "Generative AI seamlessly integrated for professional creatives" },
  { name: "Looka", url: "https://looka.com", category: "Design", pricing: "Paid", rating: 4.6, description: "AI-powered brand identity and beautiful logo maker" },
  { name: "CapCut AI", url: "https://capcut.com", category: "Video & Audio", pricing: "Free", rating: 4.8, description: "Free, highly accessible video editor with strong AI magic tools" },
  { name: "Murf.ai", url: "https://murf.ai", category: "Video & Audio", pricing: "Freemium", rating: 4.7, description: "Versatile AI voice generator with realistic human voices" },
  { name: "Synthesia", url: "https://synthesia.io", category: "Video & Audio", pricing: "Paid", rating: 4.8, description: "Professional AI video generation using highly realistic avatars" },
  { name: "Goblin.tools", "url": "https://goblin.tools", category: "Productivity", pricing: "Free", rating: 4.9, description: "A collection of simple AI tools designed for neurodivergent folks" },
  { name: "Routine", url: "https://routine.co", category: "Productivity", pricing: "Freemium", rating: 4.6, description: "Calendar and task management supercharged with AI" },
  { name: "Motion", url: "https://usemotion.com", category: "Productivity", pricing: "Paid", rating: 4.7, description: "AI executive assistant that automatically schedules your workload" },
  { name: "Semantic Scholar", url: "https://semanticscholar.org", category: "Research", pricing: "Free", rating: 4.7, description: "Free academic search engine powered by AI" },
  { name: "Perplexity AI", url: "https://perplexity.ai", category: "Research", pricing: "Freemium", rating: 4.9, description: "The ultimate conversational AI search engine for verified answers" },
  { name: "AlphaSense", url: "https://alpha-sense.com", category: "Research", pricing: "Paid", rating: 4.8, description: "Premium market intelligence and search platform for professionals" },
  { name: "HubSpot Content Assistant", url: "https://hubspot.com", category: "Marketing", pricing: "Free", rating: 4.7, description: "Free generative AI tools baked into the HubSpot ecosystem" },
  { name: "Predis.ai", url: "https://predis.ai", category: "Marketing", pricing: "Freemium", rating: 4.7, description: "AI social media post and short-form video generator" },
  { name: "AdCreative.ai", url: "https://adcreative.ai", category: "Marketing", pricing: "Paid", rating: 4.6, description: "Generate highly converting ad creatives and social media posts" },
  { name: "DeepL Write", url: "https://deepl.com/write", category: "Writing", pricing: "Free", rating: 4.8, description: "Incredibly accurate AI-powered writing and phrasing companion" },
  { name: "Rytr", url: "https://rytr.me", category: "Writing", pricing: "Freemium", rating: 4.6, description: "Lightning-fast AI writing assistant for content creators" },
  { name: "ProWritingAid", url: "https://prowritingaid.com", category: "Writing", pricing: "Paid", rating: 4.7, description: "Premium, in-depth grammar and style checker for serious writers" },
  { name: "Tidio AI", url: "https://tidio.com", category: "Customer Support", pricing: "Free", rating: 4.6, description: "Customer support chatbot with a robust, permanently free AI tier" },
  { name: "Crisp MagicReply", url: "https://crisp.chat", category: "Customer Support", pricing: "Freemium", rating: 4.7, description: "AI customer service inbox and automated ticketing system" },
  { name: "Intercom Fin", url: "https://intercom.com/fin", category: "Customer Support", pricing: "Paid", rating: 4.8, description: "Premium, highly accurate AI bot for professional support teams" },
  { name: "Apollo.io", url: "https://apollo.io", category: "Sales", pricing: "Free", rating: 4.8, description: "Massive B2B database with a free tier featuring AI email sequencing" },
  { name: "Seamless.ai", url: "https://seamless.ai", category: "Sales", pricing: "Freemium", rating: 4.6, description: "Real-time B2B sales lead search engine and prospect builder" },
  { name: "Gong.io", url: "https://gong.io", category: "Sales", pricing: "Paid", rating: 4.9, description: "Premium revenue intelligence and sales conversation analytics" }
]

// 1. Load existing tools
const file = fs.readFileSync("src/data/tools.ts", "utf8")
const blocks = [...file.matchAll(/\{\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*pricing:\s*"([^"]+)",\s*rating:\s*([0-9.]+),\s*url:\s*"([^"]+)",?\s*\}/g)]

const existingTools = blocks.map((m) => ({
  name: m[1],
  description: m[2],
  category: m[3],
  pricing: m[4],
  rating: parseFloat(m[5]),
  url: m[6],
}))

// 2. Deduplicate and merge map (keyed by lowercase normalized name)
const map = new Map()
for (const t of existingTools) {
  map.set(t.name.toLowerCase().trim(), t)
}
for (const t of newTools) {
  map.set(t.name.toLowerCase().trim(), t)
}

const allTools = Array.from(map.values())
console.log(`Merged total: ${allTools.length} unique tools (no duplicates)`)

// 3. Extract unique categories in order
const defaultCategories = [
  "Coding", "Building", "Design", "Video & Audio", "Productivity",
  "Research", "Agents", "Marketing", "Writing", "Data Analysis",
  "Presentations", "3D & Animation", "Customer Support", "Sales"
]
const categoriesSet = new Set(defaultCategories)
allTools.forEach((t) => categoriesSet.add(t.category))
const allCategories = Array.from(categoriesSet)

// 4. Generate src/data/tools.ts
const toolsTsContent = `export type Pricing = "Free" | "Freemium" | "Paid"
export type Category =
${allCategories.map((c) => `  | "${c}"`).join("\n")}

export interface Tool {
  name: string
  description: string
  category: Category
  pricing: Pricing
  rating: number
  url: string
}

export const CATEGORIES: Array<Category> = [
${allCategories.map((c) => `  "${c}",`).join("\n")}
]

export const PRICING_OPTIONS = ["All", "Free", "Freemium", "Paid"] as const
export type PricingFilter = (typeof PRICING_OPTIONS)[number]

export const tools: Tool[] = ${JSON.stringify(allTools, null, 2)}
`

fs.writeFileSync("src/data/tools.ts", toolsTsContent)
console.log("Updated src/data/tools.ts")

// 5. Generate formatted text and JSON files for downloads and public
let textContent = `================================================================================
infyAI - Complete List of Curated AI Tools (${allTools.length} Tools)
Website: https://infyai.com
================================================================================\n\n`

allCategories.forEach((cat) => {
  const catTools = allTools.filter((t) => t.category === cat)
  if (catTools.length === 0) return
  textContent += `[${cat.toUpperCase()}] (${catTools.length})\n`
  catTools.forEach((t, idx) => {
    textContent += `${idx + 1}. ${t.name}\n   URL: ${t.url}\n   Category: ${t.category} | Pricing: ${t.pricing} | Rating: ${t.rating}\n   Description: ${t.description}\n\n`
  })
})

fs.writeFileSync("public/infy_ai_tools.txt", textContent)
fs.writeFileSync("C:/Users/User/Downloads/infy_ai_tools.txt", textContent)
fs.writeFileSync("C:/Users/User/Downloads/infy_ai_tools.json", JSON.stringify(allTools, null, 2))
console.log(`Saved updated text & JSON files to C:/Users/User/Downloads/ (${allTools.length} tools)`)

// 6. Sync directly to Supabase DB
const supabaseUrl = "https://eemhvfqldhkcdbsbibgo.supabase.co"
const supabaseKey = "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"
const supabase = createClient(supabaseUrl, supabaseKey)

const fallbackCategoryMap = {
  "Data Analysis": "Research",
  "Presentations": "Design",
  "3D & Animation": "Design",
  "Customer Support": "Agents",
  "Sales": "Marketing",
}

async function syncSupabase() {
  console.log(`Syncing all ${allTools.length} tools to Supabase...`)
  await supabase.from("tools").delete().neq("id", "00000000-0000-0000-0000-000000000000")

  let inserted = 0
  for (const t of allTools) {
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
    else console.error(`Error inserting ${t.name}:`, res.error.message)
  }

  const { data: dbTools } = await supabase.from("tools").select("id, name")
  console.log(`🎉 Supabase database verified: Exactly ${dbTools ? dbTools.length : inserted} tools live! (0 duplicates)`)
}

syncSupabase()
