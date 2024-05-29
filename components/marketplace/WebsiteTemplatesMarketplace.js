import React, { useEffect, useState } from "react";
import templatedata from "./websitetemplates.json";
import Image from "next/image";
import { Avatar, Popover } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function WebsiteTemplatesMarketplace() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("asc");

  const sorted = templates.sort((a, b) => {
    const isReversed = sortType === "asc" ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  useEffect(() => {
    setTemplates(templatedata);
  }, []);

  // templates && templates[0]?.data && templates[0]?.data

  //   let totalPrices = 0;
  //   templates &&
  //     templates?.map((template) => {
  //       template.data &&
  //         template.data?.products &&
  //         template?.data?.products?.map((product) => {
  //           totalPrices += product.price / 100;
  //         });
  //     });

  //   console.log("Total Prices: ", totalPrices);

  return (
    <div>
      {/* products showcase 4 columns grid */}
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            margin: "1rem 0 3rem",
          }}
        >
          {templates &&
            templates?.map((template) => {
              return (
                template.data &&
                template.data?.products &&
                template?.data?.products?.map((product) => {
                  return (
                    <div
                      key={product.id}
                      style={{
                        border: "1px solid #eaeaea",
                        borderRadius: "10px",
                        padding: "1rem",
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        src={product.card_image}
                        alt={product.name}
                        width={604}
                        height={420}
                        objectFit="cover"
                        loading="lazy"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                        style={{
                          borderRadius: "5px",
                        }}
                      />
                      <div>
                        <div className="flexed-between">
                          <Popover content={<h3>{product?.name}</h3>}>
                            <h3
                              style={{
                                width: "80%",
                              }}
                            >
                              {product.name.length > 20
                                ? product.name.substring(0, 20) + "..."
                                : product.name}
                            </h3>
                          </Popover>
                          <h3>${product.price / 100}</h3>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "1rem",
                            gap: "0.5rem",
                          }}
                        >
                          <Avatar src={product?.author?.avatar_url} size={24} />
                          <h3>{product?.author?.display_name}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })
              );
            })}
        </div>
      </div>
    </div>
  );
}
