import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/add-task" className="nav-link">
            Add Task
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
