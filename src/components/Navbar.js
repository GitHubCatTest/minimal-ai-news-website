import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Top News", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Politics", path: "/politics" },
    { name: "Tech", path: "/tech" },
    { name: "Sports", path: "/sports" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between">
        <span className="font-bold text-xl">AI News</span>
        <ul className="flex space-x-4">
          {navItems.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`px-3 py-1 rounded-full transition-colors ${
                  pathname === item.path
                    ? "bg-cream text-darktext font-medium"
                    : "text-gray-600 hover:bg-cream"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
