// pages/form-responses/[id].jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spin, Alert } from "antd";
import FormResponsesTable from "../../../components/FormResponses/FormResponsesTable";
import instance from "../../../axios";

const FormResponsesPage = () => {
  const router = useRouter();
  const { id } = router.query; // Form ID from the URL

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch form responses
  const fetchResponses = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await instance.get(`/form-submission`, {
        params: { form_id: id },
      });

      if (response.status === 200) {
        // Ensure that form_data is an object; if not, handle accordingly
        const sanitizedData = response.data.map((item) => ({
          ...item,
          form_data:
            item.form_data && typeof item.form_data === "object"
              ? item.form_data
              : {},
        }));
        setResponses(sanitizedData);
      } else {
        setError("Failed to fetch form responses.");
      }
    } catch (err) {
      console.error("Error fetching form responses:", err);
      setError("An error occurred while fetching form responses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="mavecontainer">
      <h1 className="text-3xl font-bold mb-6">Form Responses</h1>
      <FormResponsesTable responses={responses} refreshData={fetchResponses} />
    </div>
  );
};

export default FormResponsesPage;
