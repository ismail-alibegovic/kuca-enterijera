/** Re-mounts on navigation, so every page enters with a calm rise (disabled for reduced motion). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
