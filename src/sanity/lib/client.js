
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, tokenId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion,
  useCdn: true,
  token: tokenId,
})
