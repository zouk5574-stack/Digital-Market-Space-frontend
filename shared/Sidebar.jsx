import { NavLink } from "react-router-dom";

function Sidebar({ links }) {
  return (
    <aside className="bg-white w-64 h-screen shadow-md p-4">
      <ul className="space-y-4">
        {links.map((l, i) => (
          <li key={i}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-neutral-light"
                }`
              }
            >
              {l.icon} {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
