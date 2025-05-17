
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, tokenId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  tokenId,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
