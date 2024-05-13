import SiteContent from "./SiteContent";
import SiteContentV2 from "./SiteContentV2";

export default function Site({ children, collapsed, setCollapsed }) {
  return (
    <>
      {/* <SiteContent collapsed={collapsed} setCollapsed={setCollapsed} /> */}
      <SiteContentV2 collapsed={collapsed} setCollapsed={setCollapsed} />
    </>
  );
}
