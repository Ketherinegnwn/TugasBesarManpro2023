import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    key: "home",
    label: (
      <Link to="/">
        Home
      </Link>
    ),
  },
  {
    label: (
      <Link to="/table">
        Table
      </Link>
    ),
    key: 'table',
  },
  {
    label: (
      <Link to="/bar_chart">
        Bar Chart
      </Link>
    ),
    key: 'barChart',
  },
  {
    label: (
      <Link to="/scatter_plot">
        Scatter Plot
      </Link>
    ),
    key: 'scatterPlot',
  },
];

const Navbar = () => {
  const location = useLocation();
  // let selected = 0;
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    console.log(location.pathname);
    switch(location.pathname) {
      case "/": setSelected(0); break;
      case "/table": setSelected(1); break;
      case "/bar_chart": setSelected(2); break;
      case "/scatter_plot": setSelected(3); break;
    }
  }, [location]);

  return (
      <div className="nav">
        <div>
        <Menu mode="horizontal" items={items} selectable disabledOverflow selectedKeys={items[selected].key}/>
        </div>
      </div>
  );
};

export default Navbar;
