import React, { useState, useEffect } from "react";
import {
  Layout,
  Switch,
  Select,
  Button,
  Collapse,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Carousel,
  Spin,
} from "antd";
import { useRouter } from "next/router";
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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  CloseCircleFilled,
  PlusOutlined,
  CloseOutlined,
  CloudSyncOutlined,
} from "@ant-design/icons";
import Link from "next/link";
const { Sider, Content } = Layout;
const { Option } = Select;
import RichTextEditor from "../../components/RichTextEditor";
import instance from "../../axios";
import bodyParser from "../../utils/sectionperser";
import ComponentParse from "../../components/creator/ComponentParser";
import ScrollToButton from "../../components/ScrollToBottomButton";
import moment from "moment";

const Creator = () => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [collapsed, setCollapsed] = useState(false);
  const [creatorMode, setCreatorMode] = useState(null);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [media, setMedia] = useState([]);
  const [menus, setMenus] = useState([]);
  const [navbars, setNavbars] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [cards, setCards] = useState([]);
  const [forms, setForms] = useState([]);
  const [footers, setFooters] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const Option = Select.Option;
  const [pageData, setPageData] = useState();
  const [showPageData, setShowPageData] = useState([]);
  const [newSection, setNewSection] = useState();
  const [newSectionComponents, setNewSectionComponent] = useState([]);
  const [newData, setNewData] = useState(null);
  const [canvas, setCanvas] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedSectionId, setEditedSectionId] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  // New members
  const [selectedComponentType, setSelectedComponentType] = useState(null);
  const [existingData, setExistingData] = useState([]);
  const [selectedExistingData, setSelectedExistingData] = useState(null);
  const [fetchedComponent, setFetchedComponent] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [updateResponse, setUpdateResponse] = useState();
  const [navbarComponents, setNavbarComponents] = useState([]);
  const [cardComponents, setCardComponents] = useState([]);
  const [searchDefault, setSearchDefault] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [updatedSection, setUpdatedSection] = useState([]);
  const [save, setSave] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const localCreatormode = localStorage.getItem("creatorMode");
    localCreatormode ? setCreatorMode(localCreatormode) : setCreatorMode(false);
  }, []);
  // console.log("newSectionComponents", newSectionComponents);
  const componentgallery = new Map([
    [
      "Title",
      {
        type: "title",
        icon: FontSizeOutlined,
        iconpath: "/images/icons/Text.svg",
        slug: "title",
      },
    ],
    [
      "Paragraph",
      {
        type: "description",
        icon: AlignLeftOutlined,
        iconpath: "/images/icons/Paragraph.svg",
        slug: "description",
      },
    ],
    /* [
      "Inner Section",
      {
        type: "inner-section",
        icon: SettingOutlined,
        iconpath: "/images/icons/InnerSection.svg",
        slug: "inner_sections",
      },
    ], */
    [
      "Media",
      {
        type: "media",
        icon: FileImageFilled,
        iconpath: "/images/icons/Image.svg",
        slug: "media",
      },
    ],
    [
      "Menu",
      {
        type: "menu",
        icon: MenuOutlined,
        iconpath: "/images/icons/Menu.svg",
        slug: "menus",
      },
    ],
    [
      "Navbar",
      {
        type: "navbar",
        icon: PicCenterOutlined,
        iconpath: "/images/icons/Header.svg",
        slug: "navbars",
      },
    ],
    [
      "Slider",
      {
        type: "slider",
        icon: SlidersOutlined,
        iconpath: "/images/icons/Carousel.svg",
        slug: "sliders",
      },
    ],
    [
      "Card",
      {
        type: "card",
        icon: IdcardOutlined,
        iconpath: "/images/icons/Card.svg",
        slug: "cards",
      },
    ],
    [
      "Form",
      {
        type: "form",
        icon: FormOutlined,
        iconpath: "/images/icons/Form.svg",
        slug: "forms",
      },
    ],
    [
      "Footer",
      {
        type: "footer",
        icon: BoxPlotOutlined,
        iconpath: "/images/icons/Footer.svg",
        slug: "footers",
      },
    ],
    [
      "Press Release",
      {
        type: "press_release",
        icon: ProfileOutlined,
        iconpath: "/images/icons/NewsPress.svg",
        slug: "press_release",
      },
    ],
    [
      "Events",
      {
        type: "event",
        icon: SwitcherOutlined,
        iconpath: "/images/icons/Event.svg",
        slug: "events",
      },
    ],
  ]);
  const [sectionUpdatedData, setSectionUpdatedData] = useState({
    _id: generateRandomId(16),
    type: "",
    _category: "root",
    data: newSectionComponents,
  });

  // Cancel Button

  const destroy = () => {
    // pop last element from newSectionComponent array
    newSectionComponents.pop();
    setNewSection(null);
    setSelectionMode(false);
  }


  const fetchComponents = async (data) => {
    try {
      setLoading(true);
      if (data !== "title" && data !== "description") {
        const responses = await instance.get(`/${data.toLowerCase()}`);
        if (responses?.status === 200) {
          setFetchedComponent(responses?.data);
        }
      }
    } catch (error) {
      message.error("Error fetching components");
      // console.log(error);
    }
    setLoading(false);
  };

  const pid = router.query.id;

  const handleFormChange = (fieldName, value, selectedType) => {
    const filteredArray = fetchedComponent?.filter((item) =>
      value.includes(item.id)
    );
    if (selectedType === "title") {
      const takenTitle = {
        _id: generateRandomId(16),
        type: "title",
        value,
      };
      setTitle(takenTitle);
    }
    if (selectedType === "description") {
      const takenDescription = {
        _id: generateRandomId(16),
        type: "description",
        value,
      };
      setDescription(takenDescription);
    }

    console.log("description", description);
    if (selectedType === "media") {
      const resultArray = filteredArray.map(
        ({ id, file_name, file_path, file_type, tags, type }) => ({
          id,
          _mave: {
            file_name,
            file_path,
            file_type,
            tags,
          },
          type: `${type ? type : selectedType}`,
        })
      );
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }
    if (selectedType === "menu") {
      const resultArray = filteredArray.map(({ id, type, ...resMenu }) => ({
        id,
        _mave: resMenu,
        type: `${type ? type : selectedType}`,
      }));
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }
    if (selectedType === "navbar") {
      const resultArray = filteredArray.map(
        ({ id, logo, logo_id, menu, menu_id, type }) => ({
          id,
          _mave: {
            logo,
            logo_id,
            menu,
            menu_id,
          },
          type: `${type ? type : selectedType}`,
        })
      );
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }

    if (selectedType === "slider") {
      const resultArray = filteredArray.map(
        ({ id, media_ids, medias, status, title_bn, title_en, type }) => ({
          id,
          _mave: {
            media_ids,
            medias,
            status,
            title_bn,
            title_en,
          },
          type: `${type ? type : selectedType}`,
        })
      );
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }

    if (selectedType === "card") {
      const resultArray = filteredArray.map(
        ({
          id,
          media_files,
          description_bn,
          description_en,
          link_url,
          title_bn,
          title_en,
          type,
        }) => ({
          id,
          _mave: {
            description_bn,
            description_en,
            link_url,
            title_bn,
            title_en,
            media_files: media_files,
          },
          type: `${type ? type : selectedType}`,
        })
      );
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }

    if (selectedType === "form") {
      const resultArray = filteredArray.map(({ id, type, ...formRest }) => ({
        id,
        _mave: formRest,
        type: `${type ? type : selectedType}`,
      }));
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }
    if (selectedType === "footer") {
      const resultArray = filteredArray.map(({ id, type, ...footerRest }) => ({
        id,
        _mave: footerRest,
        type: `${type ? type : selectedType}`,
      }));
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }
    if (selectedType === "press_release") {
      const resultArray = filteredArray.map(({ id, type, ...pressRest }) => ({
        id,
        _mave: pressRest,
        type: `${type ? type : selectedType}`,
      }));
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }
    if (selectedType === "event") {
      const resultArray = filteredArray.map(({ id, type, ...eventRest }) => ({
        id,
        _mave: eventRest,
        type: `${type ? type : selectedType}`,
      }));
      setNewSectionComponent((prev) => [...prev, ...resultArray]);
      setSearchDefault(null);
    }
  };

  const handleClickOfText = (selectedType) => {
    if (selectedType === "title") {
      setNewSectionComponent((prev) => [...prev, title]);
      setSearchDefault(null);
    }
    if (selectedType === "description") {
      setNewSectionComponent((prev) => [...prev, description]);
      setSearchDefault(null);
    }
  };

  function generateRandomId(length) {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters?.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
  // console.log("newSectionComponents", newSectionComponents);
  const sectionData = {
    _id: generateRandomId(16),
    type: "",
    _category: "root",
    data: newSectionComponents,
  };

  const updateSectionData = (index, updatedComponent) => {
    const updatedData = { ...sectionData };
    updatedData.data[index] = updatedComponent;
    sectionData = updatedData;
  };

  let postDataBody;
  if (!newSectionComponents?.length) {
    postDataBody = showPageData;
  }
  if (!showPageData?.length) {
    postDataBody = [sectionData];
  } else {
    postDataBody = [...showPageData, sectionData];
  }
  const postData = {
    slug: "home",
    type: "Page",
    favicon_id: 10,
    page_name_en: "Home",
    page_name_bn: "হোম",
    head: {
      meta_title: "Home Page",
      meta_description: "This is a home page of the MAVE CMS",
      meta_keywords: ["home", "Page", "CMS", "Builder"],
    },
    body: postDataBody,
  };

  const handleSubmit = async () => {
    try {
      const response = await instance.put(`/pages/${pid}`, postData);
      if (response?.status === 200) {
        setUpdateResponse(response.data);
        message.success("Page updated successfully");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      }

      fetchPageData();
      setNewSectionComponent([]);
    } catch (error) {
      message.error(error.message);
      // console.log("Error updating press release", error);
    }
  };
  const fetchPageData = async () => {
    try {
      setLoading(true);
      if (pid) {
        const pageDataResponse = await instance.get(`/pages/${pid}`);
        if (pageDataResponse.status === 200) {
          setPageData(pageDataResponse?.data);
        }
      }
    } catch (error) {
      message.error("Error fetching page data");
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [pid]);
  const convertedSectionData = bodyParser(pageData);
  useEffect(() => {
    setShowPageData(convertedSectionData);
  }, [pageData]);

  const handleCloseSectionModal = () => {
    setNewSectionComponent([]);
    setCanvas(false);
    setShowPageData(showPageData);
  };
  const handleSave = async () => {

    const modifiedData = {
      slug: "home",
      type: "Page",
      favicon_id: 10,
      page_name_en: "Home",
      page_name_bn: "Home Bangla",
      head: {
        meta_title: "Home Page",
        meta_description: "This is a home page of the MAVE CMS",
        meta_keywords: ["home", "Page", "CMS", "Builder"],
      },
      body: updatedSection,
    };
    // console.log("Sending: ", modifiedData);

    // put request
    setLoading(true);
    try {
      const response = await instance.put(`/pages/${pid}`, modifiedData);
      if (response?.status === 200) {
        setUpdateResponse(response.data);
        message.success("Page updated successfully");
        fetchPageData();
      }
    } catch (error) {
      message.error(error.message);
      // console.log("Error updating press release", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (sectionId) => {
    setEditedSectionId(sectionId);
    setEditMode(!editMode);
  };

  const handleUpdateSectionData = (index, updatedComponent) => {
    // console.log("Updated Section Data:", updatedComponent);
    const updatedData = { ...sectionData };
    updatedData.data[index] = updatedComponent;
    sectionData = updatedData;
  };

  // Parsers

  const handleNavbarSelect = (selectedNavbarId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item) => {
          if (item.type === selectedNavbarId.type) {
            // console.log("selectedNavbarId", selectedNavbarId);
            return selectedNavbarId; // Replace the item with the selectedNavbarId data
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });

    setUpdatedSection(updatedPageData);
  };

  const handleCardSelect = (selectedCardId) => {
    // console.log("Index of the changed card: ", selectedCardId?.niloy);
    // change card data of only the index of the component in the section
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item, index) => {
          if (index === selectedCardId?.niloy) {
            // console.log("selectedCardId", selectedCardId);
            return selectedCardId;
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });
    setUpdatedSection(updatedPageData);
  };
  // console.log("updatedSection (Cards)", updatedSection);

  const handleMediaSelect = (selectedMediaId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item) => {
          if (item.type === selectedMediaId.type) {
            // console.log("selectedMediaId", selectedMediaId);
            return selectedMediaId; // Replace the item with the selectedMediaId data
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });
    setUpdatedSection(updatedPageData);
  };
  // console.log("updatedSection", updatedSection);

  const handleEventSelect = (selectedEventId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item) => {
          if (item.type === selectedEventId.type) {
            // console.log("selectedEventId", selectedEventId);
            return selectedEventId; // Replace the item with the selectedEventId data
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });
    setUpdatedSection(updatedPageData);
  };
  // console.log("updatedSection (Events): ", updatedSection);

  const handleMenuSelect = (selectedMenuId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item) => {
          if (item.type === selectedMenuId.type) {
            // console.log("selectedMenuId", selectedMenuId);
            return selectedMenuId; // Replace the item with the selectedMenuId data
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });
    setUpdatedSection(updatedPageData);
  };
  // console.log("updatedSection", updatedSection);

  const handleTitleChange = (index, value, type) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item, i) => {
          if (i === index) {
            return {
              type: type,
              value: value,
            };
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    }
    );
    setUpdatedSection(updatedPageData);
  };


  // console.log("updatedSection", updatedSection);

  // const handleDescriptionChange = (value) => {
  //   const updatedPageData = showPageData.map((section) => {
  //     if (section._id === editedSectionId) {
  //       const updatedData = section.data.map((item) => {
  //         if (item.type === "description") {
  //           return value; // Replace the item with the selectedDescriptionId data
  //         }
  //         return item;
  //       });

  //       return {
  //         ...section,
  //         data: updatedData,
  //       };
  //     }
  //     return section;
  //   });
  //   setUpdatedSection(updatedPageData);
  // };

  const handleDescriptionChange = (index, value, type) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item, i) => {
          if (i === index) {
            return {
              type: type,
              value: value,
            };
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    }
    );
    setUpdatedSection(updatedPageData);
  }

  const handleSliderSelect = (selectedSliderId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item) => {
          if (item.type === selectedSliderId.type) {
            return selectedSliderId;
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });
    setUpdatedSection(updatedPageData);
  };
  // console.log("updatedSection", updatedSection);

  const handlePressReleaseSelect = (selectedPressReleaseId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item) => {
          if (item.type === selectedPressReleaseId.type) {
            // console.log("selectedPressReleaseId", selectedPressReleaseId);
            return selectedPressReleaseId;
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });
    setUpdatedSection(updatedPageData);
  };

  const handleGasSelect = (selectedGasId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        const updatedData = section.data.map((item) => {
          if (item.type === selectedGasId.type) {
            return selectedGasId;
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });

    setUpdatedSection(updatedPageData);
  };
  // console.log("updatedSection", updatedSection);

  const handleFormSelect = (selectedFormId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        // console.log("selectedFormId", selectedFormId);
        const updatedData = section.data.map((item) => {
          if (item.type === selectedFormId.type) {
            // console.log("selectedFormId", selectedFormId);
            return selectedFormId; // Replace the item with the selectedFormId data
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });

    setUpdatedSection(updatedPageData);
  };

  const handleFooterSelect = (selectedFooterId) => {
    const updatedPageData = showPageData.map((section) => {
      if (section._id === editedSectionId) {
        // console.log("selectedFooter Id: ", selectedFooterId);
        const updatedData = section.data.map((item) => {
          if (item.type === selectedFooterId.type) {
            return selectedFooterId;
          }
          return item;
        });

        return {
          ...section,
          data: updatedData,
        };
      }
      return section;
    });
    setUpdatedSection(updatedPageData);
  };
  // delete section and make a put request with updated data
  const handleDeleteSection = async (sectionId) => {
    const updatedPageData = showPageData.filter(
      (section) => section._id !== sectionId
    );
    setUpdatedSection(updatedPageData);
    // put request with updated page data
    setLoading(true);
    try {
      const response = await instance.put(`/pages/${pid}`, {
        ...pageData,
        body: updatedPageData,
      });
      if (response?.status === 200) {
        setUpdateResponse(response.data);
        message.success("Page updated successfully");
        fetchPageData();
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          <div
            className="creator-canvas"
            style={{
              position: "relative",
            }}
          >
            <div>
              {updatedSection.length > 0 ? (
                <>
                  {updatedSection?.map((section, index) => (
                    <section
                      className=""
                      style={{
                        width: "1170px",
                        padding: "20px 30px",
                        border: "1px solid var(--themes)",
                      }}
                      key={section?._id}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "20px 30px",
                          borderRadius: 10,
                          color: "white",
                          background: "var(--theme)",
                          marginBottom: 20,
                        }}
                      >
                        <h1>Section {index + 1}</h1>
                        {editedSectionId !== section?._id && (
                          <>
                            <Button
                              style={{
                                margin: "10px",
                                backgroundColor: "var(--themes",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "1.2rem",
                                padding: "0.6rem 1rem",
                                height: "auto",
                              }}
                              onClick={() => handleEditClick(section?._id)}
                            >
                              Edit Mode
                            </Button>
                          </>
                        )}
                      </div>

                      {/* Edit Section */}
                      <ComponentParse
                        section={section?.data}
                        editMode={editMode && editedSectionId == section?._id}
                        setEditMode={setEditMode}
                        onNavbarSelect={handleNavbarSelect}
                        onCardSelect={handleCardSelect}
                        onMediaSelect={handleMediaSelect}
                        onEventSelect={handleEventSelect}
                        onMenuSelect={handleMenuSelect}
                        onTitleChange={handleTitleChange}
                        onDescriptionChange={handleDescriptionChange}
                        onSliderSelect={handleSliderSelect}
                        onPressReleaseSelect={handlePressReleaseSelect}
                        onFormSelect={handleFormSelect}
                        onFooterSelect={handleFooterSelect}
                        // dummy
                        onUpdateSectionData={handleUpdateSectionData}
                        sectionData={sectionUpdatedData}
                        setSectionData={setSectionUpdatedData}
                        setNewData={setNewData}
                      />
                      {editedSectionId === section?._id && (
                        <center>
                          <Button
                            style={{
                              margin: "10px",
                              backgroundColor: "var(--theme",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "1.2rem",
                              padding: "0.6rem 1rem",
                              marginBottom: "3rem",
                              height: "auto",
                            }}
                            onClick={() => {
                              setEditMode(false);
                              setSave(true);
                              setEditedSectionId(null);
                              handleUpdateSectionData(index, sectionData);
                              handleSave();
                              // here
                              setNewSectionComponent([]);
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            danger
                            onClick={() => {
                              setUpdatedSection([]);
                              setEditMode(false);
                              setEditedSectionId(null);
                            }}
                          >
                            Cancel Edit
                          </Button>
                        </center>
                      )}
                    </section>
                  ))}
                </>
              ) : (
                <>
                  {showPageData?.map((section, index) => (
                    <section
                      className=""
                      style={{
                        width: "1170px",
                        padding: "20px 30px",
                        border: "2px solid var(--themes)",
                        borderRadius: 10,
                        marginTop: 40,
                      }}
                      key={section?._id}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "20px 30px",
                          borderRadius: 10,
                          color: "white",
                          background: "var(--theme)",
                          marginBottom: 20,
                        }}
                      >
                        <h1>Section {index + 1}</h1>
                        {editedSectionId !== section?._id && (
                          <>
                            <Button
                              style={{
                                margin: "10px",
                                backgroundColor: "var(--themes",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "1.2rem",
                                padding: "0.6rem 1rem",
                                height: "auto",
                              }}
                              onClick={() => handleEditClick(section?._id)}
                            >
                              Edit Mode
                            </Button>
                            <Popconfirm
                              title="Are you sure to delete this section?"
                              onConfirm={() =>
                                handleDeleteSection(section?._id)
                              }
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                danger
                                style={{
                                  margin: "10px",
                                  backgroundColor: "var(--themes",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "1.2rem",
                                  padding: "0.6rem 1rem",
                                  height: "auto",
                                }}
                              >
                                Delete Section
                              </Button>
                            </Popconfirm>
                          </>
                        )}
                      </div>

                      {/* Loading */}
                      {
                        loading ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Spin spinning={loading} />
                          </div>
                        ) :
                          (
                            <ComponentParse
                              section={section?.data}
                              editMode={editMode && editedSectionId == section?._id}
                              onNavbarSelect={handleNavbarSelect}
                              onCardSelect={handleCardSelect}
                              onMediaSelect={handleMediaSelect}
                              onEventSelect={handleEventSelect}
                              onMenuSelect={handleMenuSelect}
                              onTitleChange={handleTitleChange}
                              onDescriptionChange={handleDescriptionChange}
                              onSliderSelect={handleSliderSelect}
                              onPressReleaseSelect={handleSliderSelect}
                              onFooterSelect={handleFooterSelect}
                              onFormSelect={handleFormSelect}
                              onUpdateSectionData={handleUpdateSectionData}
                              sectionData={sectionUpdatedData}
                              setSectionData={setSectionUpdatedData}
                              setNewData={setNewData}
                            />
                          )
                      }

                      {editedSectionId === section?._id && (
                        <center>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Button
                              style={{
                                margin: "10px",
                                backgroundColor: "var(--theme",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "1.2rem",
                                padding: "0.6rem 1rem",
                                marginBottom: "3rem",
                                height: "auto",
                              }}
                              onClick={() => {
                                setCanvas(true);
                              }}
                            >
                              Add Component
                            </Button>
                            <div>
                              <Button
                                style={{
                                  margin: "10px",
                                  backgroundColor: "var(--theme",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "1.2rem",
                                  padding: "0.6rem 1rem",
                                  marginBottom: "3rem",
                                  height: "auto",
                                }}
                                onClick={() => {
                                  setEditMode(false);
                                  setEditedSectionId(null);
                                  // console.log("Sending: ", sectionData);
                                  handleUpdateSectionData(index, sectionData);
                                  handleSave();
                                }}
                              >
                                Save
                              </Button>

                              <Button
                                danger
                                onClick={() => {
                                  setEditMode(false);
                                  setEditedSectionId(null);
                                }}
                              >
                                Cancel Edit
                              </Button>
                            </div>
                          </div>
                        </center>
                      )}
                    </section>
                  ))}
                </>
              )}
            </div>
            {/* {// console.log("newSectionComponents", sectionData)} */}
            <div>
              {newSectionComponents?.length > 0 && (
                <section
                  className=""
                  style={{
                    width: "1170px",
                    padding: "20px 30px",
                    border: "2px solid var(--theme)",
                    borderRadius: 10,
                    marginTop: 40,
                  }}
                >
                  <h1
                    style={{
                      color: "white",
                      borderRadius: 10,
                      border: "1px solid var(--gray)",
                      padding: "20px 30px",
                      background: "#0d0d0d",
                      marginBottom: 20,
                    }}
                  >
                    Section{" "}
                    {showPageData?.length ? showPageData?.length + 1 : 1}
                  </h1>

                  <ComponentParse section={sectionData?.data} />
                </section>
              )}
            </div>
            <center>
              {canvas && (
                <div
                  className="flexed-center"
                  style={{
                    width: "50vw",
                    height: "300px",
                    border: "2px dashed var(--black)",
                    borderRadius: "10px",
                    marginTop: "3rem",
                  }}
                >
                  {selectionMode ? (
                    <div>
                      {fetchedComponent && selectedComponentType && (
                        <>
                          {(() => {
                            switch (selectedComponentType) {
                              case "title":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Input
                                      style={{
                                        padding: "1em 2em",
                                        marginBottom: "1em",
                                        borderRadius: 10,
                                        fontSize: "1.6rem",
                                        fontWeight: "bold",
                                      }}
                                      placeholder="Enter Title"
                                      onChange={(e) =>
                                        handleFormChange(
                                          "hero_title_en",
                                          e.target.value,
                                          selectedComponentType
                                        )
                                      }
                                    />
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "30%",
                                      gap: "2em",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => {
                                          handleClickOfText(
                                            selectedComponentType
                                          );
                                          setSelectionMode(false);
                                        }}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "description":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    {/* <RichTextEditor
                                      editMode="true"
                                      placeholder="Enter Description"
                                      onChange={(e) =>
                                        handleFormChange(
                                          e.target.value,
                                          selectedComponentType
                                        )
                                      }
                                    /> */}
                                    <RichTextEditor
                                      editMode="true"
                                      placeholder="Enter Description"
                                      onChange={(e) =>
                                        handleFormChange(
                                          "hero_description_en",
                                          e,
                                          selectedComponentType
                                        )
                                      }
                                    />
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "30%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => {
                                          handleClickOfText(
                                            selectedComponentType
                                          );
                                          setSelectionMode(false);
                                        }}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "inner-section":
                                return (
                                  <InnerSectionParser
                                    item={item}
                                    editMode={editMode}
                                  />
                                );
                              case "media":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Media"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((card, index) => (
                                        <Select.Option
                                          key={index}
                                          value={card.id}
                                        >
                                          <Image
                                            preview={false}
                                            src={`${MEDIA_URL}/${card?.file_path}`}
                                            alt={card?.file_path}
                                            width={300}
                                            height={200}
                                            objectFit="cover"
                                          />
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "1em 2em",
                                        width: "30%",
                                      }}
                                    >
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => {
                                          setSelectionMode(false);
                                        }}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "menu":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Menu"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((menu, index) => (
                                        <Select.Option
                                          key={index}
                                          value={menu.id}
                                        >
                                          {menu?.name}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >Cancel</Button>
                                    </div>
                                  </div>
                                );
                              case "navbar":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Navbar"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((card, index) => (
                                        <Select.Option
                                          key={index}
                                          value={card.id}
                                        >
                                          {card.title_en}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >Cancel</Button>
                                    </div>
                                  </div>
                                );
                              case "slider":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    {console.log("Got sliders", fetchedComponent)}
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Slider"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((card, index) => (
                                        <Select.Option
                                          key={index}
                                          value={card.id}
                                        >
                                          {
                                            card && (
                                              <div>
                                                <Carousel
                                                  autoplay
                                                  style={{
                                                    width: "100%",
                                                    height: "100%",
                                                  }}
                                                >
                                                  {
                                                    card?.medias?.map((media, index) => (
                                                      <div key={index}>
                                                        <Image
                                                          preview={false}
                                                          src={`${MEDIA_URL}/${media?.file_path}`}
                                                          alt={media?.file_path}
                                                          width={"100%"}
                                                          height={200}
                                                          style={{ objectFit: "cover", borderRadius: 10 }}
                                                        />
                                                      </div>
                                                    ))
                                                  }
                                                </Carousel>
                                              </div>
                                            )
                                          }
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        onClick={() => setSelectionMode(false)}
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>

                                  </div>
                                );
                              case "card":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Cards"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((card, index) => (
                                        <Select.Option
                                          key={index}
                                          value={card.id}
                                        >
                                          {card.title_en}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "form":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Form"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((form, index) => (
                                        <Select.Option
                                          key={index}
                                          value={form.id}
                                        >
                                          {form.title_en}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "footer":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Footer"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((footer, index) => (
                                        <Select.Option
                                          key={index}
                                          value={footer.id}
                                        >
                                          {footer.title_en}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "press_release":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Press Release"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((press_release, index) => (
                                        <Select.Option
                                          key={index}
                                          value={press_release.id}
                                        >
                                          {moment(press_release.created_at).format("Do MMMM YYYY")}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "event":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Events"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((event, index) => (
                                        <Select.Option
                                          key={index}
                                          value={event.id}
                                        >
                                          {console.log("Event", event)}
                                          {event.title_en}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );
                              case "gas":
                                return (
                                  <div style={{ width: "40vw" }}>
                                    <Select
                                      value={searchDefault}
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: "100%" }}
                                      placeholder="Select Tabs"
                                      onChange={(value) =>
                                        handleFormChange(
                                          "card_ids",
                                          value,
                                          selectedComponentType
                                        )
                                      }
                                    >
                                      {fetchedComponent?.map((card, index) => (
                                        <Select.Option
                                          key={index}
                                          value={card.id}
                                        >
                                          {card.id}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1em 2em",
                                      width: "40%",
                                    }}>
                                      <Button
                                        style={{
                                          backgroundColor: "var(--theme)",
                                          color: "#fff",
                                        }}
                                        onClick={() => setSelectionMode(false)}
                                        icon={<PlusOutlined />}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        danger
                                        onClick={() => destroy()}
                                        icon={<CloseOutlined />}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                );

                              default:
                                return <h1>Contact Admin</h1>;
                            }
                          })()}
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Button
                        style={{
                          margin: "10px",
                          backgroundColor: "var(--theme)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "40px",
                          fontSize: "1.2rem",
                          padding: "0.6rem 1rem",
                          marginBottom: "3rem",
                          height: "auto",
                        }}
                        onClick={() => {
                          handleSubmit();
                          setCanvas(false);
                        }}
                        icon={<CloudSyncOutlined />}
                      >
                        Finish Section
                      </Button>
                      <Button
                        style={{
                          margin: "10px",
                          backgroundColor: "var(--themes)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "40px",
                          fontSize: "1.2rem",
                          padding: "0.6rem 1rem",
                          marginBottom: "3rem",
                          height: "auto",
                        }}
                        icon={<PlusSquareOutlined />}
                        onClick={() => setModalVisible(true)}
                      >
                        Add Components
                      </Button>
                      <Button
                        danger
                        style={{
                          margin: "10px",
                          border: "none",
                          borderRadius: "40px",
                          fontSize: "1.2rem",
                          padding: "0.6rem 1rem",
                          marginBottom: "3rem",
                          height: "auto",
                          border: "1px solid red",
                        }}
                        icon={<CloseCircleFilled />}
                        onClick={() => {
                          handleCloseSectionModal();
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {!selectionMode && !canvas && (
                <Button
                  style={{
                    backgroundColor: "var(--theme)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.2rem",
                    margin: "3rem 0",
                    height: "60px",
                    width: "200px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => {
                    setCanvas(true);
                  }}
                >
                  Add Section
                </Button>
              )}
            </center>

            <Modal
              width={1000}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={modalVisible}
              onCancel={() => {
                setModalVisible(false);
              }}
              footer={
                <>
                  <Button
                    onClick={() => {
                      setModalVisible(false);
                      setSelectedComponentType(null);
                      setSelectedExistingData(null);
                    }}
                  >
                    Close
                  </Button>
                </>
              }
            >
              <div
                className="flexed-center"
                style={{
                  width: "55vw",
                  height: "auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gridGap: "1.5rem",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {Array.from(componentgallery.entries()).map(
                  ([componentKey, component], index) => (
                    <div
                      key={index}
                      className="flexed-center"
                      onClick={() => {
                        setSelectedComponentType(component.type);
                      }}
                    >
                      <Button
                        style={{
                          width: "100%",
                          height: "auto",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          fetchComponents(component.slug);
                          setSelectedComponentType(component.type);
                          setModalVisible(false);
                          setSelectionMode(true);
                        }}
                      >
                        <img
                          src={component.iconpath}
                          style={{ width: "7rem", height: "7rem" }}
                        />
                      </Button>
                    </div>
                  )
                )}
              </div>
            </Modal>

            <Modal>
              <Select
                style={{ width: "100%" }}
                placeholder="Select a card"
                onChange={(value) => {
                  setSelectedExistingData(
                    cards.find((card) => card._id === value)
                  );
                }}
              >
                {cards.map((card) => (
                  <Option value={card._id}>{card.title}</Option>
                ))}
              </Select>
            </Modal>
          </div>
          <ScrollToButton />
        </div>
      </div>
    </>
  );
};
export default Creator;
