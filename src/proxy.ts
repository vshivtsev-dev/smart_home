import {headers} from "next/headers";
import {type NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  // https://www.better-auth.com/docs/integrations/next#how-to-handle-auth-checks-in-each-pageroute

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
