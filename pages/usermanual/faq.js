import {
  ArrowRightOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Collapse, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import faqjson from "./faq.json";

const faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [activeFaq, setActiveFaq] = useState();
  const [searchMode, setSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const fetchFaqData = async () => {
    setFaqData(faqjson);
    setQuestions(faqjson.map((item) => item?.content?.question));
    setAnswers(faqjson.map((item) => item?.content?.answer));
    setActiveFaq(faqjson && faqjson[0]?.id);
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  const onSearch = (value) => {
    setSearch(value);
    if (value) {
      setSearchMode(true);
      const results = faqData.filter(
        (item) =>
          (item?.content?.question &&
            item?.content?.question
              ?.toLowerCase()
              .includes(value.toLowerCase())) ||
          (item?.content?.answer &&
            item?.content?.answer?.toLowerCase().includes(value.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchMode(false);
    }
  };

  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gap: "1em",
            width: "100%",
          }}
        >
          <div
            className="faq-categories"
            style={{
              borderRight: "1px solid #f0f0f0",
              padding: "2em 1em",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
            }}
          >
            <Input
              allowClear
              suffix={<SearchOutlined />}
              placeholder="Search for a question..."
              style={{ width: "100%" }}
              onChange={(e) => onSearch(e.target.value)}
            />
            <div
              style={{
                listStyleType: "none",
                padding: "0",
                margin: "0",
                marginTop: "1em",
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              {faqData &&
                faqData?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "0.5em",
                      padding: "1em",
                      cursor: "pointer",
                      fontWeight: activeFaq === item?.id ? "bold" : "",
                      color: activeFaq === item?.id ? "white" : "",
                      backgroundColor:
                        activeFaq === item?.id ? "var(--theme)" : "",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      setActiveFaq(item?.id);
                    }}
                  >
                    {item?.name}
                    {activeFaq === item?.id && <RightOutlined />}
                  </div>
                ))}
            </div>
          </div>
          <div
            className="faq-questions"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              padding: "1em 3em",
            }}
          >
            <div className="header flexed-between">
              {activeFaq && searchMode ? (
                <h2>Search Results for "{search}"</h2>
              ) : (
                faqData?.map(
                  (item) => item?.id === activeFaq && <h1>{item?.name}</h1>
                )
              )}
            </div>
            {searchMode ? (
              <>
                <div className="questions">
                  {searchResults &&
                    searchResults?.map((item, index) => (
                      <div key={index} className="question">
                        <Collapse
                          defaultActiveKey={["0"]}
                          ghost
                          expandIconPosition="right"
                          style={{
                            fontSize: "1.15em",
                          }}
                        >
                          <Collapse.Panel
                            header={item?.content?.question}
                            key={index}
                            style={{
                              borderRadius: "5px",
                              border: "1px solid #f0f0f0",
                              padding: "1em",
                              marginBottom: "1em",
                            }}
                          >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item?.content?.answer,
                              }}
                            />
                          </Collapse.Panel>
                        </Collapse>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <>
                <p
                  style={{
                    padding: "1em",
                    color: "gray",
                    borderRadius: "5px",
                  }}
                >
                  {faqData &&
                    faqData?.map(
                      (item) => item?.id === activeFaq && item?.description
                    )}
                </p>
                <div className="questions">
                  {faqData &&
                    faqData?.map(
                      (item) =>
                        item?.id === activeFaq &&
                        item?.content?.map((content, index) => (
                          <div key={index} className="question">
                            <Collapse
                              defaultActiveKey={["0"]}
                              ghost
                              expandIconPosition="right"
                              style={{
                                fontSize: "1.15em",
                              }}
                            >
                              <Collapse.Panel
                                header={content?.question}
                                key={index}
                                style={{
                                  borderRadius: "5px",
                                  border: "1px solid #f0f0f0",
                                  padding: "1em",
                                  marginBottom: "1em",
                                }}
                              >
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: content?.answer,
                                  }}
                                />
                              </Collapse.Panel>
                            </Collapse>
                          </div>
                        ))
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default faq;
