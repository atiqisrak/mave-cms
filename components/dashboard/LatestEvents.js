import {
  ContactsFilled,
  FileFilled,
  FileImageFilled,
  FileOutlined,
  MessageFilled,
  MoreOutlined,
} from "@ant-design/icons";

// export const activityLog = [
//   {
//     categoryType: 1,
//     category: "Page",
//     time: "11:32",
//     type: "New Page",
//     user: "Atiq Israk",
//     description: "New Page Created by Atiq Israk",
//   },
//   {
//     categoryType: 2,
//     category: "Page",
//     time: "11:20",
//     type: "About Page Updated",
//     user: "Israk Niloy",
//     description: "About Page Updated by Israk Niloy",
//   },
//   {
//     categoryType: 3,
//     category: "Form",
//     time: "11:10",
//     type: "New Form Submitted",
//     user: "Website Visitor",
//     description: "New Form Submitted by Website Visitor",
//   },
//   {
//     categoryType: 4,
//     category: "Blog",
//     time: "11:00",
//     type: "New Blog Post",
//     user: "Lord Shamim",
//     description: "New Blog Post by Galaxy Lord Shamim",
//   },
// ];

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
    icon: <FileFilled style={{ fontSize: "1.4rem", color: "#29CC39" }} />,
    backgroundColor: "#F4FCF5",
  },
  {
    id: 2,
    icon: <FileImageFilled style={{ fontSize: "1.4rem", color: "#8833FF" }} />,
    backgroundColor: "#F5F0FC",
  },
  {
    id: 3,
    icon: <MessageFilled style={{ fontSize: "1.4rem", color: "#FF6633" }} />,
    backgroundColor: "#FCEEEB",
  },
  {
    id: 4,
    icon: <ContactsFilled style={{ fontSize: "1.4rem", color: "#3361FF" }} />,
    backgroundColor: "#EBF2FC",
  },
];

export default function LatestEvents() {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "1rem",
        backgroundColor: "white",
      }}
    >
      <div
        className="flexed-among"
        style={{
          borderBottom: "1px solid var(--gray)",
          marginBottom: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "var(--mild-black)",
          }}
        >
          Latest Events
        </h4>

        <MoreOutlined
          onClick={() => {
            console.log("More Clicked");
          }}
        />
      </div>

      {/* Activity */}
      <div>
        <div>
          {activityLog.map((log, index) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 4fr",
                gap: "2rem",
                // padding: "1rem 0",
              }}
            >
              {/* icon */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  //   gap: "1rem",
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
        </div>
      </div>
    </div>
  );
}
