/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { checkSanityEnv } from '@/lib/env-check'

// Enable dynamic rendering for production
export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  try {
    // Check environment variables first
    const envCheck = checkSanityEnv()

    if (!envCheck.isValid) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
            <p className="text-gray-600 mb-4">
              Sanity Studio configuration is incomplete.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-red-800 mb-2">Missing Environment Variables:</h3>
              <ul className="list-disc list-inside text-red-700">
                {envCheck.missing.map((varName) => (
                  <li key={varName}>{varName}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Please ensure all required environment variables are set in your Vercel deployment.
            </p>
          </div>
        </div>
      )
    }

    return <NextStudio config={config} />
  } catch (error) {
    console.error('Sanity Studio Error:', error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Studio Error</h1>
          <p className="text-gray-600">
            There was an error loading the Sanity Studio. Please check your configuration.
          </p>
          <details className="mt-4 text-sm text-gray-500">
            <summary>Error Details</summary>
            <pre className="mt-2 text-left">{JSON.stringify(error, null, 2)}</pre>
          </details>
        </div>
      </div>
    )
  }
}
