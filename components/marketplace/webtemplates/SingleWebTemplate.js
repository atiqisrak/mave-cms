import { RightOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SingleWebTemplate({ product }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("darkmode") === "true" ? "dark" : "light"
  );

  // Set Theme
  useEffect(() => {
    const interval = setInterval(() => {
      const theme =
        localStorage.getItem("darkmode") === "true" ? "dark" : "light";
      setTheme(theme);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${product.card_image})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          height: "50vh",
          // color: "white",
          color: theme === "dark" ? "white" : "black",
          overflow: "hidden",
        }}
      >
        <div
          className="single-web-template-header"
          style={{
            padding: "10rem 4vw 17em 10vw",
            backgroundColor:
              theme === "dark"
                ? "rgba(0, 0, 0, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            {product?.name}
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              // color: "var(--gray-dark)",
              color: theme === "dark" ? "white" : "var(--gray-dark)",
            }}
          >
            {product?.blurb}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--gray-dark)",
              }}
            >
              <Avatar
                src={product?.author?.avatar_url}
                size={32}
                style={{ marginRight: "0.2rem" }}
              />
              <span>{product?.author?.display_name}</span>
              <RightOutlined />
              <span>{product?.category[0]?.name}</span>
            </div>
            <>
              <Button
                className="request-purchase-button"
                size="large"
                // onMouseEnter={(e) => {
                //   e.target.style.backgroundColor = "white";
                //   e.target.style.color = "black";
                //   e.target.style.border = "2px solid white";
                // }}
                // onMouseLeave={(e) => {
                //   e.target.style.backgroundColor = "#2D68FF";
                //   e.target.style.color = "white";
                //   e.target.style.border = "2px solid #2D68FF";
                // }}
                onClick={() => {
                  window.location.href =
                    "https://wa.me/+8801400893882?text=I%20want%20to%20purchase%20this%20product%20" +
                    product?.name +
                    "%20for%20$" +
                    product?.price / 100 +
                    "Product%20Link:%20" +
                    window.location.href;
                }}
              >
                Request Purchase ${20 + product?.price / 100}
              </Button>
            </>
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
          borderTop: "2px solid #f0f0f0",
          backgroundColor: theme === "dark" ? "#121212" : "white",
          width: "100%",
          margin: "0 auto",
          padding: "5rem 4% 0 10%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            paddingBottom: "8rem",
          }}
        >
          {product.detail_images.map((image) => (
            <div
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "2px solid var(--mild-black)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Image
                key={image._id}
                src={image.url}
                alt={product.blurb}
                width={604}
                height={420}
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
