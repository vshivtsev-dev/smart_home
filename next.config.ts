import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  allowedDevOrigins: ["192.168.0.*", "*.vshivtsev.dev"],
  cacheComponents: true,
};

export default nextConfig;
