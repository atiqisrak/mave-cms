import { Card, Image, message } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";

const GasParser = ({ item }) => {
  const [gas, setGas] = useState();
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [loading, setLoading] = useState(false);

  const fetchGas = async () => {
    setLoading(true);
    try {
      const response = await instance(`/gas/${item?.id}`);
      if (response?.status === 200) {
        setGas(response?.data);
        setLoading(false);
      } else {
        message.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGas();
  }, []);

  return (
    <>
      {/* <h1>Gas</h1>
      {console.log("GasParser", gas)} */}

      {gas && (
        <div
          style={{
            border: "1px solid var(--themes)",
            borderRadius: 10,
            padding: "1em 2em",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <h2>
              Gas Type:
              {gas?.type && gas?.type == "cylinder_gas"
                ? " Cylinder Gas"
                : " Bulk Gas"}
            </h2>
            <h3>Gas Weight: {gas?.weight}</h3>
            <h3>Unit Price: {gas?.unit_price}</h3>
          </div>
          <div>
            {gas?.media_mave?.file_type.startsWith("image") ? (
              <Image
                src={`${MEDIA_URL}/${gas?.media_mave?.file_path}`}
                alt={gas?.media_mave?.file_name}
                width={"100%"}
                height={"auto"}
              />
            ) : (
              <video
                muted
                src={`${MEDIA_URL}/${gas?.media_mave?.file_path}`}
                alt={gas?.media_mave?.file_name}
                style={{ width: "15vw", height: "auto" }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GasParser;
