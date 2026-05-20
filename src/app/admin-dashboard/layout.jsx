export const metadata = {
  manifest: "/manifest.json",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  themeColor: "#f97316",
};

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
