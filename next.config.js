/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cada API route já corre isoladamente como serverless function na Vercel.
  // Não precisamos de rewrites porque a estrutura de pastas /app/carronamao/api
  // já mapeia 1:1 para o caminho público /carronamao/api/*.
  reactStrictMode: true,
};

module.exports = nextConfig;
