import fs from "fs"
import { createClient } from "@supabase/supabase-js"

const popularFreeToolNames = new Set([
  "aider",
  "openhands",
  "continue",
  "codeium",
  "streamlit",
  "playground ai",
  "capcut ai",
  "goblin.tools",
  "fathom",
  "notebooklm",
  "arc search",
  "chatpdf",
  "semantic scholar",
  "crewai",
  "autogpt",
  "deepl write",
  "luma genie",
  "apollo.io",
  "tidio ai"
])

// 1. Read existing tools.ts
const file = fs.readFileSync("src/data/tools.ts", "utf8")
const match = file.match(/export const tools: Tool\[\] = (\[[\s\S]*?\])\n\n?/m)
const toolsArray = JSON.parse(match[1])

// 2. Mark is_infy_pick on popular free tools
const updatedTools = toolsArray.map((t) => {
  const isFree = t.pricing === "Free"
  const isPopular = popularFreeToolNames.has(t.name.toLowerCase().trim())
  return {
    ...t,
    is_infy_pick: isFree && isPopular ? true : false,
  }
})

console.log(`Infy Picks count: ${updatedTools.filter((t) => t.is_infy_pick).length} popular free tools`)

// 3. Write back to src/data/tools.ts
const categories = [
  "Coding", "Building", "Design", "Video & Audio", "Productivity",
  "Research", "Agents", "Marketing", "Writing", "Data Analysis",
  "Presentations", "3D & Animation", "Customer Support", "Sales"
]

const newContent = `export type Pricing = "Free" | "Freemium" | "Paid"
export type Category =
${categories.map((c) => `  | "${c}"`).join("\n")}

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
${categories.map((c) => `  "${c}",`).join("\n")}
]

export const PRICING_OPTIONS = ["All", "Free", "Freemium", "Paid"] as const
export type PricingFilter = (typeof PRICING_OPTIONS)[number]

export const tools: Tool[] = ${JSON.stringify(updatedTools, null, 2)}
`

fs.writeFileSync("src/data/tools.ts", newContent)
console.log("Updated src/data/tools.ts with is_infy_pick property")

// 4. Update Supabase
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

async function syncToSupabase() {
  console.log("Syncing updated tools with is_infy_pick to Supabase...")
  await supabase.from("tools").delete().neq("id", "00000000-0000-0000-0000-000000000000")

  let inserted = 0
  for (const t of updatedTools) {
    let res = await supabase.from("tools").insert({
      name: t.name,
      description: t.description,
      category: t.category,
      pricing: t.pricing,
      rating: t.rating,
      url: t.url,
      is_infy_pick: t.is_infy_pick || false,
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
        is_infy_pick: t.is_infy_pick || false,
      })
    }

    if (!res.error) inserted++
    else console.error(`Error inserting ${t.name}:`, res.error.message)
  }

  console.log(`Supabase synced: ${inserted} tools updated with is_infy_pick!`)
}

syncToSupabase()
