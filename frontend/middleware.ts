import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const userPermissions = request.cookies.get('userPermissions')?.value
  const isAdmin = request.cookies.get('isAdmin')?.value === 'true'

  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Check specific admin routes permissions
    if (request.nextUrl.pathname.startsWith('/admin/users')) {
      const permissions = userPermissions ? JSON.parse(userPermissions) : {}
      if (!permissions.read) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
  ],
} 