import fs from "fs"

const file = fs.readFileSync("src/data/tools.ts", "utf8")
const names = [...file.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1])

console.log("Total tools count in tools.ts:", names.length)

const seen = new Set()
const duplicates = []
for (const n of names) {
  if (seen.has(n)) {
    duplicates.push(n)
  }
  seen.add(n)
}

console.log("Unique tool count:", seen.size)
console.log("Duplicates found:", duplicates)
