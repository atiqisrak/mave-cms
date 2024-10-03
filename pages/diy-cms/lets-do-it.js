import { Breadcrumb } from "antd";
import ModelCreator from "../../components/diycms/ModelCreator";
import { HomeFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
export default function LetsDoIt() {
  const router = useRouter();
  return (
    <div className="ViewContentContainer">
      <Breadcrumb
        style={{
          marginBottom: "1em",
          cursor: "pointer",
        }}
      >
        <Breadcrumb.Item
          onClick={() => {
            router.push("/");
          }}
        >
          <HomeFilled />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            router.push("/diy-cms");
          }}
        >
          DIY CMS
        </Breadcrumb.Item>
        <Breadcrumb.Item>Let's Do It</Breadcrumb.Item>
      </Breadcrumb>
      <ModelCreator />
    </div>
  );
}
