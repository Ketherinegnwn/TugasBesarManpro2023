import React, { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

import Navbar from "../component/Navbar";
import styles from "@/styles/Home.module.css";

const { Dragger } = Upload;

const Home = () => {
  const [uploading, setUploading] = useState(false);

  const props = {
    name: "file",
    maxCount: 1,
    action: "/api/data",
    accept: ".csv",
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.response.count} data(s) have been added.`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.wrapperUpload}>
        <Dragger {...props} className={styles.upload} disabled={uploading}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Support for a single CSV file.</p>
        </Dragger>
      </div>
    </div>
  );
};

export default Home;
