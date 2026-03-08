import { BlobServiceClient } from '@azure/storage-blob'
import { DefaultAzureCredential } from '@azure/identity'

export async function uploadImageToBlob(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'blog-images'

  const credential = new DefaultAzureCredential()
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    credential
  )
  const containerClient = blobServiceClient.getContainerClient(containerName)

  const uniqueName = `${Date.now()}-${filename}`
  const blockBlobClient = containerClient.getBlockBlobClient(uniqueName)

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: contentType },
  })

  return blockBlobClient.url
}
