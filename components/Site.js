import SiteContent from "./SiteContent";

export default function Site({ children, collapsed, setCollapsed }) {
  return (
    <>
      <SiteContent collapsed={collapsed} setCollapsed={setCollapsed} />
    </>
  );
}
