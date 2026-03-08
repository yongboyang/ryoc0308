import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">📝 My Blog</Link>
        <Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          发布文章
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />
        )}
        <time className="text-sm text-gray-400">{post.date}</time>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-8">{post.title}</h1>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <Link href="/" className="inline-block mt-12 text-blue-600 hover:underline">← 返回首页</Link>
      </article>
    </main>
  )
}
