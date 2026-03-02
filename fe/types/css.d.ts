// Allow CSS file imports (used by Next.js and wallet adapter styles)
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
