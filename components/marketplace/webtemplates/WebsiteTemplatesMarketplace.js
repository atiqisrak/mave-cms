import React, { useEffect, useState } from "react";
import templatedata from "../websitetemplates.json";
import Image from "next/image";
import { Avatar, Popover, Pagination } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "../../../styles/templatemarket.module.css";
import router from "next/router";

export default function WebsiteTemplatesMarketplace() {
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setTemplates(templatedata && templatedata[0]?.data);
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const updateVisibleCount = () => {
    if (window.innerWidth >= 1200) {
      setVisibleCount(12);
    } else if (window.innerWidth >= 992) {
      setVisibleCount(9);
    } else if (window.innerWidth >= 768) {
      setVisibleCount(6);
    } else {
      setVisibleCount(3);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(
      (prevCount) =>
        prevCount +
        (window.innerWidth >= 1000
          ? 12
          : window.innerWidth >= 992
          ? 9
          : window.innerWidth >= 768
          ? 6
          : 3)
    );
  };

  const currentTemplates = templates?.products?.slice(0, visibleCount);

  console.log(
    "Templates: ",
    templates && templates?.products && templates?.products[0]
  );

  return (
    <div>
      <div className={styles.gridcontainer}>
        {currentTemplates &&
          currentTemplates.map((product) => {
            return (
              <div
                key={product.id}
                className={styles.griditem}
                onClick={() =>
                  router.push({
                    pathname: `/marketplace/web-template/${product?.slug}`,
                    query: {
                      product_id: product?._id,
                    },
                  })
                }
              >
                <Image
                  src={product.card_image}
                  alt={product.name}
                  width={604}
                  height={420}
                  objectFit="cover"
                  loading="lazy"
                  placeholder="blur"
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
                    <h3>${20 + product.price / 100}</h3>
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
          })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "6rem",
        }}
      >
        {visibleCount < templates?.products?.length && (
          <button
            onClick={handleLoadMore}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              borderRadius: "5px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
