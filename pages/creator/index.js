import React from "react";
import { useRouter } from "next/router";
import PageEditor from "../../components/creator/main/PageEditor";

const Creator = () => {
  const router = useRouter();
  const { id } = router.query;

  return <PageEditor pageId={id} />;
};

export default Creator;
