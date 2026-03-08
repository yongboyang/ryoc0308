import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">📝 My Blog</Link>
        <Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          发布文章
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">最新文章</h1>
        {posts.length === 0 ? (
          <p className="text-gray-500">暂无文章，去发布第一篇吧！</p>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <article key={post.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <time className="text-sm text-gray-400">{post.date}</time>
                  <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && <p className="text-gray-600 text-sm">{post.excerpt}</p>}
                  <Link href={`/blog/${post.slug}`} className="inline-block mt-4 text-blue-600 text-sm hover:underline">
                    阅读全文 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
