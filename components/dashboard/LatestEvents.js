import {
  ContactsFilled,
  FileFilled,
  FileImageFilled,
  FileOutlined,
  MessageFilled,
  MoreOutlined,
} from "@ant-design/icons";
import Image from "next/image";

export const activityLog = [
  {
    categoryType: 1,
    category: "Page",
    time: "11:32",
    type: "New Page",
    user: "Atiq Israk",
    description:
      "A new page titled 'Home' was created by Atiq Israk. This page will serve as the landing page for the website.",
  },
  {
    categoryType: 2,
    category: "Page",
    time: "11:20",
    type: "About Page Updated",
    user: "Israk Niloy",
    description:
      "The About page has been updated by Israk Niloy. This update includes adding new team members and expanding on the company's history and vision.",
  },
  {
    categoryType: 3,
    category: "Form",
    time: "11:10",
    type: "New Form Submitted",
    user: "Website Visitor",
    description:
      "A new form has been submitted by a website visitor. This form contains inquiries regarding product pricing and availability.",
  },
  {
    categoryType: 4,
    category: "Blog",
    time: "11:00",
    type: "New Blog Post",
    user: "Lord Shamim",
    description:
      "A new blog post titled 'The Secrets of the Universe' has been published by Galaxy Lord Shamim. This post delves into the mysteries of astrophysics and explores the possibilities of extraterrestrial life.",
  },
];

export const activityIcons = [
  {
    id: 1,
    icon: <FileFilled style={{ fontSize: "1.4rem", color: "#E3A611" }} />,
    backgroundColor: "#FFF4DC",
  },
  {
    id: 2,
    icon: <FileImageFilled style={{ fontSize: "1.4rem", color: "#E3A611" }} />,
    backgroundColor: "#FFF4DC",
  },
  {
    id: 3,
    icon: <MessageFilled style={{ fontSize: "1.4rem", color: "#E3A611" }} />,
    backgroundColor: "#FFF4DC",
  },
  {
    id: 4,
    icon: <ContactsFilled style={{ fontSize: "1.4rem", color: "#E3A611" }} />,
    backgroundColor: "#FFF4DC",
  },
];

export default function LatestEvents() {
  return (
    <div
      style={{
        border: "2.22px solid #C9C9C9",
        borderRadius: "1rem",
        backgroundColor: "var(--white)",
      }}
    >
      <div
        className="top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2.22px solid #C9C9C9",
          padding: "0.7rem 1rem",
          marginBottom: "1rem",
        }}
      >
        <h3>Digital Footprint</h3>
        <Image
          src="/icons/mave_icons/threedots.svg"
          alt="Three Dots"
          width={40}
          height={40}
          style={{
            transform: "rotate(90deg)",
          }}
        />
      </div>
      {/* Activity */}
      <div
        style={{
          padding: "0.5rem 0.8rem",
          overflowY: "scroll",
          height: "40rem",
        }}
      >
        {activityLog.map((log, index) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 4fr",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {activityIcons.map((icon) => {
                if (icon.id === log.categoryType) {
                  return (
                    <div
                      style={{
                        backgroundColor: icon.backgroundColor,
                        width: "4rem",
                        height: "4rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      {icon.icon}
                    </div>
                  );
                }
              })}
              {index !== activityLog.length - 1 && (
                <div
                  style={{
                    width: "0.15rem",
                    height: "7rem",
                    backgroundColor: "var(--gray)",
                  }}
                ></div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                {/* Time - Catefory - User */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "1rem",
                    marginTop: "1.1rem",
                  }}
                >
                  {/* Time */}
                  <p
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "var(--gray)",
                      borderRadius: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "var(--mild-black)",
                    }}
                  >
                    {log.time}
                  </p>

                  {/* Category */}
                  <p
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "var(--gray)",
                      borderRadius: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "var(--mild-black)",
                    }}
                  >
                    {log.category}
                  </p>

                  {/* User */}
                  <p
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "var(--gray)",
                      borderRadius: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "var(--mild-black)",
                    }}
                  >
                    {log.user}
                  </p>
                </div>
              </div>
              {/* Description */}
              <div>
                <p
                  style={{
                    color: "var(--mild-black)",
                    fontSize: "1rem",
                    fontWeight: 400,
                    lineHeight: "1.5rem",
                  }}
                >
                  {log.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* {console.log("Activity Log: ", activityLog)} */}
      </div>
    </div>
  );
}
