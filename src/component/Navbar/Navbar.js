import React, { useEffect, useState } from "react";
// import "./Navbar.css";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const items = [
  {
    key: "home",
    label: <Link href="/">Home</Link>,
  },
  {
    label: <Link href="/data">Data</Link>,
    key: "data",
  },
  {
    label: <Link href="/bar_chart">Bar Chart</Link>,
    key: "barChart",
  },
  {
    label: <Link href="/scatter_plot">Scatter Plot</Link>,
    key: "scatterPlot",
  },
];

const Navbar = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    console.log(router.asPath);
    switch (router.asPath) {
      case "/":
        setSelected(0);
        break;
      case "/data":
        setSelected(1);
        break;
      case "/bar_chart":
        setSelected(2);
        break;
      case "/scatter_plot":
        setSelected(3);
        break;
    }
  }, []);

  return (
    <div className="nav">
      <div>
        <Menu
          mode="horizontal"
          items={items}
          selectable
          disabledOverflow
          selectedKeys={items[selected].key}
        />
      </div>
    </div>
  );
};

export default Navbar;
