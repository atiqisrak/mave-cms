import React, { useState, useEffect } from 'react';
import Sider from 'antd/es/layout/Sider';
import {
    MenuOutlined,
    PicCenterOutlined,
    SlidersOutlined,
    IdcardOutlined,
    FormOutlined,
    FontSizeOutlined,
    BoxPlotOutlined,
    SettingOutlined,
    ProfileOutlined,
    SwitcherOutlined,
    FileImageFilled,
    AlignLeftOutlined,
} from "@ant-design/icons";
import { Switch } from 'antd';


const CreatorComponentsGallery = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }
    , []);

    const handleCollapse = (collapsed) => {
        setCollapsed(collapsed);
    }

    const toggleCreatorMode = () => {
        if (localStorage.getItem("creatorMode") == "true") {
            localStorage.setItem("creatorMode", false);
        } else {
            localStorage.setItem("creatorMode", true);
        }
        window.location.reload();
    }

    const componentgallery = [
        {
            title: "Section",
            icon: SettingOutlined,
        },
        {
            title: "Title",
            icon: FontSizeOutlined,
        },
        {
            title: "Paragraph",
            icon: AlignLeftOutlined,
        },
        {
            title: "Inner Section",
            icon: SettingOutlined,
        },
        {
            title: "Media",
            icon: FileImageFilled,
        },
        {
            title: "Menu",
            icon: MenuOutlined,
        },
        {
            title: "Navbar",
            icon: PicCenterOutlined,
        },
        {
            title: "Slider",
            icon: SlidersOutlined,
        },
        {
            title: "Card",
            icon: IdcardOutlined,
        },
        {
            title: "Form",
            icon: FormOutlined,
        },
        {
            title: "Footer",
            icon: BoxPlotOutlined,
        },
        {
            title: "Press Release",
            icon: ProfileOutlined,
        },
        {
            title: "Events",
            icon: SwitcherOutlined,
        },
    ];
    return (
        <div>
            <Sider
                trigger={null}
                collapsible={true}
                collapsed={collapsed}
                onCollapse={handleCollapse}
                breakpoint="md"
                collapsedWidth={80}
                width={260}
                theme="lite"
                style={{
                  overflow: "auto",
                  position: "fixed",
                  zIndex: 1,
                  height: "100%",
                  left: 0,
                  top: 0,
                  borderRadius: "0 10px 10px 0",
                  paddingTop: 30,
                }}
              >
                <div>
                  <div
                    className="logoholder"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 30,
                      paddingTop: 40,
                    }}
                  >
                    {/* --------Version--------- */}
                    <h3 style={{
                      color: "var(--gray)",
                    }}>v 1.1</h3>


                    {/* Slider Switch Toggle for creator mode */}
                    {
                      token ? (
                        <Switch
                          style={{
                            width: '6vw',
                            background: 'var(--theme)',
                          }}
                          checkedChildren="Creator"
                          unCheckedChildren="Admin"
                          onChange={() => toggleCreatorMode()}
                          checked={
                            localStorage.getItem("creatorMode") == "true" ? true : false
                          }
                        />
                      ) : null
                    }


                    {/* Components Gallery */}
                    <div className="components-gallery">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 20,
                }}>
                    {
                        componentgallery?.map((item, index) => (
                            <div className="components-gallery-item" key={index}>
                                <item.icon className="components-gallery-item-icon" />
                                <h3>{item.title}</h3>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
                  </div>
                </div>
              </Sider>
        </div>
    )
}

export default CreatorComponentsGallery;