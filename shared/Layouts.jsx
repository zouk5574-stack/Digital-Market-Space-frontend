import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children, links }) {
  return (
    <div className="flex h-screen bg-neutral-light">
      <Sidebar links={links} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
