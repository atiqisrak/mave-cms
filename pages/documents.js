import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Image,
  Modal,
  Pagination,
  Row,
  Select,
  Skeleton,
  Spin,
  message,
} from "antd";
import instance from "../axios";
import { setPageTitle } from "../global/constants/pageTitle";
import Loader from "../components/Loader";
import {
  FilterOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const DOC_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

const Documents = () => {
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(1);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/media");

      const documentAssets = response.data.filter((asset) =>
        asset?.file_type?.startsWith("application")
      );
      setDocuments(documentAssets);
    } catch (error) {
      console.error("Error fetching document assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
    setPageTitle("Documents");
  }, [page]);

  const onDelete = async (id) => {
    try {
      Modal.confirm({
        title: "Delete Media",
        content: "Are you sure you want to delete this media?",
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          setDocuments((prevAssets) =>
            prevAssets.filter((asset) => asset.id !== id)
          );

          try {
            const response = await instance.delete(`/media/${id}`);
            if (response.data) {
              message.success("Document deleted successfully");
            } else {
              message.error("Error deleting document");
            }
          } catch (error) {
            message.error("Error deleting document");
          }
        },
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="ViewContainer ViewContentContainer media-area login-page-section">
        <h1 style={{ textAlign: "center" }}>Document Library</h1>
        {console.log("Documents: ", documents)}

        <div>
          {documents && documents.length > 0 ? (
            <Row gutter={[16, 16]}>
              {documents.map((document, index) => (
                <Col
                  key={index}
                  style={{
                    marginTop: "40px",
                  }}
                >
                  <div
                    className="media-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "15px",
                      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                      gap: "20px",
                    }}
                  >
                    {/* <img
                                                src="/images/pdf_file_type.png"
                                                alt="pdf"
                                                style={{
                                                    width: "auto",
                                                    height: "18vh",
                                                }}
                                                onClick={() => window.open(`${DOC_URL}/${document?.file_path}`)}
                                            /> */}
                    {
                      console.log(
                        "Document: ",
                        `${DOC_URL}/${document?.file_path}`
                      )
                      // if space in file name, replace with %20
                    }
                    <iframe
                      src={`${DOC_URL}/${document?.file_path}`}
                      style={{
                        width: "300px",
                        height: "40vh",
                      }}
                      title="document"
                    />
                    <Button danger onClick={() => onDelete(document?.id)}>
                      Delete
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h2>No documents found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
