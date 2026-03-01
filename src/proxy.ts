import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // 1. If no token and not on login page -> Redirect to login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. If token exists and user tries to go to login -> Redirect to dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Match all routes EXCEPT static files and API routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};


// TESTING IF TOKEN IS BEING GRABBED FROM THE COOKIES 
// export function proxy(request: NextRequest) {
// const token = request.cookies.get('access_token');
// const cookie = request.cookies.get('access_token');

//   console.log("PATH:", request.nextUrl.pathname);
//   console.log("COOKIES:", request.cookies.getAll());
//   console.log("TOKEN:", token);

//   return NextResponse.next();

// }