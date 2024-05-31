// pages/webtemplates/[singletemplate].js
import { useRouter } from "next/router";
import Image from "next/image";
import { Avatar, Spin } from "antd";
import { useEffect, useState } from "react";
import SingleWebTemplate from "../../../components/marketplace/webtemplates/SingleWebTemplate";
import templatedata from "../../../components/marketplace/websitetemplates.json";
import Head from "next/head";

export default function SingleTemplate() {
  const router = useRouter();
  const { product_id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (product_id) {
      console.log("Fetching product with ID:", product_id); // Debugging line
      const product = templatedata[0]?.data?.products?.find(
        (product) => product._id === product_id
      );
      if (product) {
        console.log("Product found:", product); // Debugging line
        setProduct(product);
      } else {
        console.error("Product not found for ID:", product_id); // Debugging line
      }
    }
  }, [product_id]);

  if (!product) {
    return (
      <div className="ViewContainer">
        <Spin size="large" />
      </div>
    );
  }

  // head
  return (
    <>
      <Head>
        <title>Marketplace - {product.blurb}</title>
        <meta name="description" content={product.blurb} />
      </Head>
      <>
        <SingleWebTemplate product={product} />
      </>
    </>
  );
}
