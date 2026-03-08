import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, coverImage } = await request.json()
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content required' }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now()

    const date = new Date().toISOString().split('T')[0]
    const frontmatter = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt || ''}"\ncoverImage: "${coverImage || ''}"\n---\n\n`
    const fileContent = frontmatter + content

    const postsDir = path.join(process.cwd(), 'content/posts')
    if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true })
    fs.writeFileSync(path.join(postsDir, `${slug}.md`), fileContent, 'utf8')

    return NextResponse.json({ slug })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
