import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/', '/favicon.ico'],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/trpc/post.hello"]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};