import { NextRequest, NextResponse } from 'next/server'
import { uploadImageToBlob } from '@/lib/azure-storage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadImageToBlob(buffer, file.name, file.type)
    return NextResponse.json({ url })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
