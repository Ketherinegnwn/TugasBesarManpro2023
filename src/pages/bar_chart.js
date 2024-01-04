import Navbar from "@/component/Navbar";
import axios from "axios";
import React, { useState } from "react";
import { message, Button, Form, Select } from "antd";
import styles from "@/styles/Data.module.css";
import dynamic from "next/dynamic";

const Column = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Column),
  { ssr: false }
);

const notInt = ["Education", "Marital_Status", "Dt_Customer"];

const fetchAgg = async ({ group, sum, agg }) => {
  let { data } = await axios.get(
    `http://localhost:3000/api/data?group=${group}&sum=${sum}&agg=${agg}`
  );

  return data;
};

const Data = () => {
  const [data, setData] = useState([]);
  const [isInt, setIsInt] = useState(true);
  const [aggColumns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

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
    // console.log("Success:", values);
    setLoading(true);
    if (notInt.includes(values.sum) && values.agg !== "COUNT") {
      setLoading(false);
      return message.error(
        `Can't use ${values.agg} aggregate on ${values.sum}!`
      );
    }

    const data = await fetchAgg(values);
    console.log(data);

    const newCol = {
      group: {
        title: columns.find((c) => c.dataIndex === values.group).title,
        dataIndex: values.group,
      },
      value: {
        title: `${values.agg}(${
          columns.find((c) => c.dataIndex === values.sum).title
        })`,
        dataIndex: values.sum,
      },
    };

    setColumns(newCol);
    setData(data);
    setLoading(false);
  };

  const config = {
    data,
    xField: aggColumns?.group?.dataIndex,
    yField: aggColumns?.value?.dataIndex,
    slider: {
      x: {},
      y: {},
    },
    tooltip: [
      { channel: "x", name: aggColumns?.group?.title },
      { channel: "y", name: aggColumns?.value?.title },
    ],
  };

  return (
    <>
      <Navbar />
      <div className={styles.aggregate}>
        <Form name="aggregate" onFinish={onFinish} layout="inline">
          <Form.Item
            label="Group by"
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
            label="Summarize"
            name="sum"
            rules={[{ required: true, message: "'Summarize' is required" }]}>
            <Select
              placeholder="Select a column"
              {...SelectProps}
              onChange={(value) => {
                if (notInt.includes(value)) return setIsInt(false);
                return setIsInt(true);
              }}>
              {columns.map((c) => (
                <Select.Option key={c.key} value={c.dataIndex}>
                  {c.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Aggregate"
            name="agg"
            rules={[{ required: true, message: "'Aggregate' is required" }]}>
            <Select placeholder="Select an aggregate function" {...SelectProps}>
              <Select.Option value="COUNT">COUNT</Select.Option>
              {isInt && (
                <>
                  <Select.Option value="SUM">SUM</Select.Option>
                  <Select.Option value="AVG">AVERAGE</Select.Option>
                  <Select.Option value="MIN">MIN</Select.Option>
                  <Select.Option value="MAX">MAX</Select.Option>
                </>
              )}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        style={{
          margin: "0 40px",
        }}>
        <Column {...config} />
      </div>
    </>
  );
};

export default Data;
