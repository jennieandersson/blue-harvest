import { NextRequest, NextResponse } from 'next/server'

import { isPreviewDeployment } from '@/app/config/site'

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV !== 'production'

  const cspHeader = `
    default-src 'self';
    base-uri 'self';
    object-src 'none';

    script-src
      'self'
      'nonce-${nonce}'
      'strict-dynamic'
      ${isDev ? "'unsafe-eval'" : ''}
      https://www.google.com
      https://*.google.com
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://analytics.google.com
      https://*.analytics.google.com
      https://www.googleadservices.com
      https://tagassistant.google.com
      https://connect.facebook.net
      https://www.facebook.com
      https://*.facebook.com
      https://cookie-script.com
      https://*.cookie-script.com
      https://pagead2.googlesyndication.com;

    style-src
      'self'
      'unsafe-inline'
      https://www.googletagmanager.com
      https://fonts.googleapis.com
      https://cookie-script.com
      https://*.cookie-script.com;

    img-src
      'self'
      data:
      blob:
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://fonts.gstatic.com
      https://www.google.com
      https://*.google.com
      https://www.google.se
      https://*.google.se
      https://www.facebook.com
      https://*.facebook.com
      https://connect.facebook.net
      https://stats.g.doubleclick.net
      https://*.doubleclick.net
      https://pagead2.googlesyndication.com
      https://*.googlesyndication.com
      https://www.googleadservices.com
      https://*.googleadservices.com
      https://cookie-script.com
      https://*.cookie-script.com;

    font-src 'self' https://fonts.gstatic.com;

    connect-src
      'self'
      ${isDev ? 'ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:*' : ''}
      https://www.google.com
      https://*.google.com
      https://www.google.se
      https://*.google.se
      https://www.google-analytics.com
      https://*.google-analytics.com
      https://analytics.google.com
      https://*.analytics.google.com
      https://www.googletagmanager.com
      https://*.googletagmanager.com
      https://g.doubleclick.net
      https://*.doubleclick.net
      https://td.doubleclick.net
      https://pagead2.googlesyndication.com
      https://*.googlesyndication.com
      https://www.googleadservices.com
      https://*.googleadservices.com
      https://tagassistant.google.com
      https://graph.facebook.com
      https://www.facebook.com
      https://*.facebook.com
      https://connect.facebook.net
      https://cookie-script.com
      https://*.cookie-script.com;

    frame-src
      'self'
      https://app.meridiq.com
      https://www.google.com
      https://*.google.com
      https://www.googletagmanager.com
      https://www.facebook.com
      https://*.facebook.com
      https://td.doubleclick.net
      https://www.googleadservices.com
      https://cookie-script.com
      https://vercel.live;

    frame-ancestors
      'self'
      https://tagassistant.google.com
      https://*.google.com
      https://*.googletagmanager.com;

    form-action 'self';
    report-to default;
    upgrade-insecure-requests;
  `

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  if (isPreviewDeployment) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  try {
    const origin = request.nextUrl.origin
    const reportTo = {
      group: 'default',
      max_age: 60 * 60 * 24 * 30, // 30 days
      endpoints: [{ url: `${origin}/api/csp-report` }],
      include_subdomains: true
    }
    response.headers.set('Report-To', JSON.stringify(reportTo))
    // Experimental / emerging header; harmless if ignored
    response.headers.set(
      'Reporting-Endpoints',
      `default="${origin}/api/csp-report"`
    )
  } catch (err) {
    // Swallow any edge-case errors deriving origin (shouldn't happen in Next middleware)
    console.warn('Error in CSP reporting headers:', err)
  }
  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
