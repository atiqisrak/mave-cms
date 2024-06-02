import { useEffect, useState } from "react";
import topinstagramers from "/src/data/topinstagramers.json";
import { Table } from "antd";
import Image from "next/image";

export default function InstagramInfluencers() {
  const [influencerData, setInfluencerData] = useState([]);

  const fetchInfluencerData = async () => {
    try {
      setInfluencerData(topinstagramers);
    } catch (error) {
      console.error("Error fetching influencer data:", error);
    }
  };

  useEffect(() => {
    fetchInfluencerData();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "rank",
      showSorterTooltip: false,
      filters: [
        { text: "Top 10", value: "Top 10" },
        { text: "Top 100", value: "Top 100" },
        { text: "Top 1000", value: "Top 1000" },
      ],
      onFilter: (value, record) => {
        if (value === "Top 10") {
          return record.rank <= 10;
        } else if (value === "Top 100") {
          return record.rank <= 100;
        } else if (value === "Top 1000") {
          return record.rank <= 1000;
        }
      },
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={image}
          alt="Influencer"
          width={100}
          height={100}
          objectFit="cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
          style={{
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: false,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      showSorterTooltip: false,
      sorter: (a, b) => parseInt(a.followers) - parseInt(b.followers),
    },
    {
      title: "Engagement Rate",
      dataIndex: "er",
      key: "er",
      showSorterTooltip: false,
      sorter: (a, b) => parseFloat(a.er) - parseFloat(b.er),
    },
    // {
    //   title: "Country",
    //   dataIndex: "country",
    //   key: "country",
    //   showSorterTooltip: false,
    //   sorter: (a, b) => a.country.localeCompare(b.country),
    // },
    {
      title: "Topics",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Potential Reach",
      dataIndex: "potentialReach",
      key: "potentialReach",
      showSorterTooltip: false,
      sorter: (a, b) =>
        parseFloat(a.potentialReach) - parseFloat(b.potentialReach),
    },
  ];

  return (
    <div>
      <Table
        loading={influencerData.length === 0}
        pagination={{ pageSize: 20 }}
        dataSource={influencerData}
        columns={columns}
      />
    </div>
  );
}
