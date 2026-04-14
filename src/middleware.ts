import { NextRequest, NextResponse } from 'next/server';

// Mobile UA patterns — covers iOS Safari, Android Chrome/Firefox, Samsung, Opera Mini, etc.
const MOBILE_UA_RE = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|silk/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only intercept the root path
  if (pathname !== '/') return NextResponse.next();

  // If they've explicitly opted into the city view via query param, let them through
  const forceCity = req.nextUrl.searchParams.get('city');
  if (forceCity !== null) return NextResponse.next();

  const ua = req.headers.get('user-agent') || '';
  if (MOBILE_UA_RE.test(ua)) {
    return NextResponse.redirect(new URL('/classic', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
