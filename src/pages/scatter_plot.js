import Navbar from "@/component/Navbar";
import React, { useState } from "react";
import { Button, Form, Select } from "antd";
import styles from "@/styles/Data.module.css";
import dynamic from "next/dynamic";

const Scatter = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Scatter),
  { ssr: false }
);

const notInt = ["Education", "Marital_Status", "Dt_Customer"];

const Data = () => {
  const [data, setData] = useState([]);
  const [isInt, setIsInt] = useState(true);

  const getColumnSearchProps = (dataIndex) => ({
    width: 200,
    dataIndex,
    key: dataIndex,
  });

  const columns = [
    {
      title: "ID",
      ...getColumnSearchProps("ID"),
    },
    {
      title: "Year Birth",
      ...getColumnSearchProps("Year_Birth"),
    },
    {
      title: "Education",
      ...getColumnSearchProps("Education"),
    },
    {
      title: "Marital Status",
      ...getColumnSearchProps("Marital_Status"),
    },
    {
      title: "Income",
      ...getColumnSearchProps("Income"),
    },
    {
      title: "Kidhome",
      ...getColumnSearchProps("Kidhome"),
    },
    {
      title: "Teenhome",
      ...getColumnSearchProps("Teenhome"),
    },
    {
      title: "Dt Customer",
      ...getColumnSearchProps("Dt_Customer"),
    },
    {
      title: "Recency",
      ...getColumnSearchProps("Recency"),
    },
    {
      title: "MntWines",
      ...getColumnSearchProps("MntWines"),
    },
    {
      title: "MntFruits",
      ...getColumnSearchProps("MntFruits"),
    },
    {
      title: "MntMeatProducts",
      ...getColumnSearchProps("MntMeatProducts"),
    },
    {
      title: "MntFishProducts",
      ...getColumnSearchProps("MntFishProducts"),
    },
    {
      title: "MntSweetProducts",
      ...getColumnSearchProps("MntSweetProducts"),
    },
    {
      title: "MntGoldProds",
      ...getColumnSearchProps("MntGoldProds"),
    },
    {
      title: "NumDealsPurchases",
      ...getColumnSearchProps("NumDealsPurchases"),
    },
    {
      title: "NumWebPurchases",
      ...getColumnSearchProps("NumWebPurchases"),
    },
    {
      title: "NumCatalogPurchases",
      ...getColumnSearchProps("NumCatalogPurchases"),
    },
    {
      title: "NumStorePurchases",
      ...getColumnSearchProps("NumStorePurchases"),
    },
    {
      title: "NumWebVisitsMonth",
      ...getColumnSearchProps("NumWebVisitsMonth"),
    },
    {
      title: "AcceptedCmp1",
      ...getColumnSearchProps("AcceptedCmp1"),
    },
    {
      title: "AcceptedCmp2",
      ...getColumnSearchProps("AcceptedCmp2"),
    },
    {
      title: "AcceptedCmp3",
      ...getColumnSearchProps("AcceptedCmp3"),
    },
    {
      title: "AcceptedCmp4",
      ...getColumnSearchProps("AcceptedCmp4"),
    },
    {
      title: "AcceptedCmp5",
      ...getColumnSearchProps("AcceptedCmp5"),
    },
    {
      title: "Complain",
      ...getColumnSearchProps("Complain"),
    },
    {
      title: "Z_CostContact",
      ...getColumnSearchProps("Z_CostContact"),
    },
    {
      title: "Z_Revenue",
      ...getColumnSearchProps("Z_Revenue"),
    },
    {
      title: "Response",
      ...getColumnSearchProps("Response"),
    },
  ];

  const SelectProps = {
    allowClear: true,
    showSearch: true,
    style: { width: 170 },
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
  };

  const config = {
    data,
    xField: "group",
    yField: "value",
  };

  return (
    <>
      <Navbar />
      <div className={styles.aggregate}>
        <Form name="aggregate" onFinish={onFinish} layout="inline">
          <Form.Item
            label="X Axis"
            name="group"
            rules={[{ required: true, message: "'Group by' is required" }]}>
            <Select placeholder="Select a column" {...SelectProps}>
              {columns.map((c) => (
                <Select.Option key={c.key} value={c.dataIndex}>
                  {c.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Y Axis"
            name="sum"
            rules={[{ required: true, message: "'Summarize' is required" }]}>
            <Select
              placeholder="Select a column"
              {...SelectProps}
              onChange={(value) => {
                if (notInt.includes(value)) return setIsInt(false);
                return setIsInt(true);
              }}>
              {columns
                .filter((c) => !notInt.includes(c.dataIndex))
                .map((c) => (
                  <Select.Option key={c.key} value={c.dataIndex}>
                    {c.title}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        style={{
          margin: "0 40px",
        }}>
        <Scatter {...config} />
      </div>
    </>
  );
};

export default Data;
