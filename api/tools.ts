import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function isAdmin(req: Request): boolean {
  const auth = req.headers.get("authorization")
  return auth === `Bearer ${process.env.VITE_ADMIN_PASSWORD}`
}

export async function GET() {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const body = await req.json()
  const { name, description, category, pricing, rating, url } = body

  if (!name || !description || !category || !pricing || !url) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { data, error } = await supabase
    .from("tools")
    .insert([{ name, description, category, pricing, rating: rating || 4.0, url }])
    .select()
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}

export async function PUT(req: Request) {
  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const body = await req.json()
  const { id, ...updates } = body

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing tool ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { data, error } = await supabase
    .from("tools")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export async function DELETE(req: Request) {
  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing tool ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { error } = await supabase.from("tools").delete().eq("id", id)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
