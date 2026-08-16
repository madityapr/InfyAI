import fs from "fs"

const file = fs.readFileSync("src/data/tools.ts", "utf8")
const match = file.match(/export const tools: Tool\[\] = (\[[\s\S]*?\])\n\n?/m)

// Parse tools cleanly
const blocks = [...file.matchAll(/\{\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*pricing:\s*"([^"]+)",\s*rating:\s*([0-9.]+),\s*url:\s*"([^"]+)",?\s*\}/g)]

const tools = blocks.map((m) => ({
  name: m[1],
  description: m[2],
  category: m[3],
  pricing: m[4],
  rating: parseFloat(m[5]),
  url: m[6],
}))

fs.writeFileSync("C:/Users/User/Downloads/infy_ai_71_tools.json", JSON.stringify(tools, null, 2))
console.log(`Saved ${tools.length} tools to C:/Users/User/Downloads/infy_ai_71_tools.json`)
