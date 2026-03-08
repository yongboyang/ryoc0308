import { BlobServiceClient } from '@azure/storage-blob'

export async function uploadImageToBlob(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'blog-images'

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
  const containerClient = blobServiceClient.getContainerClient(containerName)

  const uniqueName = `${Date.now()}-${filename}`
  const blockBlobClient = containerClient.getBlockBlobClient(uniqueName)

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: contentType },
  })

  return blockBlobClient.url
}
