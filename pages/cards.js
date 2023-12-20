import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card as AntCard,
    Image,
    Spin,
    Button,
    Input,
    Modal,
    Switch,
    Card,
    Select,
    Checkbox,
    Pagination
} from 'antd';
import instance from '../axios';
import Site from '../components/Site';
import {
    ArrowRightOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditFilled,
    FilterOutlined,
    PlusCircleOutlined,
    RestOutlined
} from '@ant-design/icons';
import Loader from '../components/Loader';
import SingleMediaSelect from '../components/SingleMediaSelect';
import CreateCardForm from '../components/CreateCardForm';
import { setPageTitle } from '../global/constants/pageTitle';
import Link from 'next/link';
import RichTextEditor from '../components/RichTextEditor';


const Cards = () => {
    useEffect(() => {
        // Set the dynamic page title for the Home page
        setPageTitle('Cards');
    }, []);

    const { Meta } = AntCard;
    const { Option } = Select;
    const [media, setMedia] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
    const [editMode, setEditMode] = useState(false);
    const [editedCard, setEditedCard] = useState(null);
    const [editedCardId, setEditedCardId] = useState(null);
    const [isCreateCardFormVisible, setIsCreateCardFormVisible] = useState(false);
    const { Search } = Input;

    const [searchText, setSearchText] = useState('');
    const [isEmptyInput, setIsEmptyInput] = useState(true);
    const [originalCardData, setOriginalCardData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfCardsPerPage = 6;
    const [sortBy, setSortBy] = useState('desc');
    const [settingsVisible, setSettingsVisible] = useState(false);


    // Change media
    const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [selectedMediaForCard, setSelectedMediaForCard] = useState(null);



    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [mediaResponse, cardsResponse] = await Promise.all([instance("/media"), instance("/cards"),]);

            if (mediaResponse.data && cardsResponse.data) {
                setMedia(mediaResponse.data);

                // Sort descending by ID
                const sortedCards = cardsResponse.data.sort((a, b) => b.id - a.id);
                setCardData(sortedCards);
                setOriginalCardData(cardsResponse.data);
            } else {
                console.error("Error fetching data");
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [setCardData]);

    // Toggle edit mode for a card
    const toggleEditMode = (card) => {
        if (editedCardId === card.id) {
            instance.put(`/cards/${editedCard.id
                }`, editedCard).then((res) => {
                    console.log("Update: ", res);
                    // Reset edit mode state
                    setEditedCard(null);
                    setEditedCardId(null);
                    setEditMode(false);
                    const getData = async () => {
                        try {
                            const res = await instance.get("/cards");
                            setCardData(res.data);
                            setIsLoading(false);
                        } catch (error) { }
                    };
                    getData();
                });
        } else {
            setEditedCard(card);
            setEditedCardId(card.id);
            setEditMode(true);
        }
    };

    // Function to handle changes to the edited card fields
    const handleFieldChange = (fieldName, value) => {
        const updatedCard = {
            ...editedCard
        };
        updatedCard[fieldName] = value;
        setEditedCard(updatedCard);
    };

    // Function to delete a card
    const deleteCard = (cardId) => {
        Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this card?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                instance.delete(`/cards/${cardId}`).then((res) => {
                    console.log("Update: ", res);
                    instance.get('/cards').then((res) => {
                        setCardData(res.data);
                    });
                });
            }
        });
    };


    // Update media for a card onselect
    const handleAddMediaToCard = (mediaId) => {
        const updatedCard = {
            ...editedCard
        };
        updatedCard.media_ids = mediaId;
        setEditedCard(updatedCard);
        instance.put(`/cards/${editedCard.id
            }`, updatedCard).then((res) => {
                console.log("Update: ", res);
                // Reset edit mode state
                setEditedCard(null);
                setEditedCardId(null);
                setEditMode(false);
                const getData = async () => {
                    try {
                        const res = await instance.get("/cards");
                        setCardData(res.data);
                        setIsLoading(false);
                    } catch (error) { }
                };
                getData();
            });
    };

    const handleOpenMediaSelectionModal = (cardId) => {
        setSelectedCardId(cardId);
        setMediaSelectionVisible(true);
    }

    const toggleCreateCardForm = () => {
        setIsCreateCardFormVisible(!isCreateCardFormVisible);
    };
    const handleCreateCard = (createdCard) => {
        setCardData([...cardData, createdCard]);
        setIsCreateCardFormVisible(false);
    };


    // Pagination
    useEffect(() => {
        const filteredCards = originalCardData.filter((card) =>
            card.title_en.toLowerCase().includes(searchText.toLowerCase())
        );
        setCardData(filteredCards);
    }, [searchText, originalCardData]);

    const handleSearch = (value) => {
        setSearchText(value);
        setIsEmptyInput(value.trim() === '');
        setCurrentPage(1); // Reset pagination when searching
    };

    const handleClear = () => {
        setSearchText('');
        setIsEmptyInput(true);
        setCurrentPage(1);
        setCardData(originalCardData);

    };

    const displayCards = cardData.slice(
        (currentPage - 1) * numberOfCardsPerPage,
        currentPage * numberOfCardsPerPage
    );

    const handleSortBy = (value) => {
        setSortBy(value);
        if (value === 'asc') {
            setCardData([...cardData].sort((a, b) => a.id - b.id));
        } else if (value === 'desc') {
            setCardData([...cardData].sort((a, b) => b.id - a.id));
        }
    };

    // Filter by page name from select option
    const handleFilterByPageName = (value) => {
        setCardData([...cardData].filter((card) => card.page_name === value));
    };



    // Sort by title
    const handleSortByTitle = (value) => {
        setSortBy(value);
        if (value === 'asc') {
            setCardData([...cardData].sort((a, b) => a.title_en.localeCompare(b.title_en)));
        } else if (value === 'desc') {
            setCardData([...cardData].sort((a, b) => b.title_en.localeCompare(a.title_en)));
        }
    };



    return (
        <>
            <div className='ViewContainer'>
                <div className="ViewContentContainer">
                    <div className="TopbarContainer"
                        style={
                            {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }
                        }>
                        <h1 style={
                            { paddingBottom: "2em" }
                        }>
                            These are Cards
                        </h1>

                        <div className="buttonHolder"
                            style={
                                {
                                    display: "grid",
                                    gridTemplateColumns: "1fr"
                                }
                            }>
                            <Button type="primary"
                                style={
                                    {
                                        backgroundColor: "var(--themes)",
                                        borderColor: "var(--themes)",
                                        color: "white",
                                        borderRadius: "10px",
                                        fontSize: "1.2em",
                                        paddingBottom: "1.8em"
                                    }
                                }
                                icon={<PlusCircleOutlined />}
                                onClick={toggleCreateCardForm}
                            >
                                Add New Card
                            </Button>
                        </div>
                    </div>
                    <div className="tableContainer">

                        {
                            isLoading && <Loader />
                        }

                        {/* Settings */}
                        <div className="settingsContainer">
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "var(--themes)",
                                    borderColor: "var(--themes)",
                                    color: "white",
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    paddingBottom: "1.8em",
                                    marginBottom: "2em",
                                }}
                                icon={<FilterOutlined />}
                                onClick={() => setSettingsVisible(!settingsVisible)}
                            >
                                Filter
                            </Button>
                            <div
                                className="settings"
                                style={{
                                    display: settingsVisible ? "block" : "none",
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "1rem",
                                }}>

                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}>
                                        <label htmlFor="sortBy">Sort by time</label>
                                        <Select
                                            showSearch
                                            id="sortBy"
                                            defaultValue={sortBy}
                                            style={{ width: 120 }}
                                            onChange={(e) => handleSortBy(e)}
                                            value={sortBy}
                                        >
                                            <Option value="desc">Descending</Option>
                                            <Option value="asc">Ascending</Option>

                                        </Select>
                                    </div>
                                    {/* Filter by page name */}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}>
                                        <label htmlFor="pageName">Filter by page name</label>
                                        <Select
                                            showSearch
                                            id="pageName"
                                            style={{ width: 120 }}
                                            onChange={(e) => handleFilterByPageName(e)}
                                        >
                                            <Option value="home">Home</Option>
                                            <Option value="corporate">Corporate</Option>
                                            <Option value="cylindergas">Cylinder Gas</Option>
                                            <Option value="autogas">Autogas</Option>
                                            <Option value="bulkgas">Bulk Gas</Option>
                                            <Option value="newsmedia">News & Media</Option>
                                            <Option value="healthandsafety">Health & Safety</Option>
                                            <Option value="career">Career</Option>
                                            <Option value="contactus">Contact Us</Option>
                                            <Option value="faq">F.A.Q</Option>
                                            <Option value="termsandconditions">Terms & Conditions</Option>
                                            <Option value="privacypolicy">Privacy Policy</Option>
                                            <Option value="cookiespolicy">Cookies Policy</Option>
                                            <Option value="sitemap">Sitemap</Option>
                                        </Select>
                                    </div>

                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}>
                                        <label htmlFor="search">Search</label>
                                        {/* Search with ant design */}
                                        <Search
                                            id="search"
                                            placeholder="Search by title"
                                            onChange={(e) => handleSearch(e.target.value)}
                                            enterButton
                                            allowClear
                                        />
                                        <Button type="primary"
                                            onClick={handleClear}
                                            // disabled={isEmptyInput}
                                            danger
                                            icon={<RestOutlined />}>
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Display mode UI */}
                        <Row gutter={[16, 16]}>
                            {isCreateCardFormVisible && (
                                <CreateCardForm
                                    onCreateCard={handleCreateCard}
                                    onCancel={toggleCreateCardForm}
                                    media={media}
                                />
                            )}
                            {
                                displayCards?.map((card) => {
                                    const mediaIds = card.media_ids ? card.media_ids.split(",")?.map(Number) : [];
                                    const mediaItems = media.filter((mediaItem) => mediaIds.includes(mediaItem.id));

                                    return (
                                        <Col span={8}
                                            key={
                                                card.id
                                            }>
                                            <AntCard
                                                style={{
                                                    borderRadius: '10px',
                                                    padding: '1rem',
                                                    marginTop: '1rem',
                                                    border: '1px solid var(--gray-dark)',
                                                    height: '100%',
                                                    overflow: 'hidden',
                                                    position: 'relative', // Added position relative
                                                }}
                                                hoverable={true}
                                                title={
                                                    card.title_en
                                                }
                                            >

                                                {/* Media content */}
                                                <div className="card-media">
                                                    {mediaItems.length > 0 ? (
                                                        mediaItems[0].file_path.endsWith('.mp4') ? (
                                                            <video loop muted style={{
                                                                height: "200px",
                                                                width: "15vw",
                                                                objectFit: 'cover', borderRadius: 10,
                                                            }}>
                                                                <source
                                                                    src={`${MEDIA_URL}/${mediaItems[0].file_path}`}
                                                                    type="video/mp4"
                                                                />
                                                            </video>
                                                        ) : (
                                                            <img
                                                                alt={card.title_en}
                                                                src={`${MEDIA_URL}/${mediaItems[0].file_path}`}
                                                                style={{
                                                                    height: "200px",
                                                                    width: "18vw",
                                                                    objectFit: 'cover',
                                                                    borderRadius: 10,
                                                                }}
                                                            />
                                                        )
                                                    ) : (
                                                        <img
                                                            src="/images/Image_Placeholder.png"
                                                            style={{
                                                                height: "200px",
                                                                width: "18vw",
                                                                objectFit: 'cover',
                                                                borderRadius: 10,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    marginBottom: '2rem',
                                                }}>
                                                    <SingleMediaSelect
                                                        visible={mediaSelectionVisible}
                                                        onCancel={() => setMediaSelectionVisible(false)}
                                                        onMediaSelect={handleAddMediaToCard}
                                                        media={media}
                                                    />
                                                    <Button
                                                        type="primary"
                                                        style={{
                                                            marginRight: '1rem',
                                                            backgroundColor: 'var(--theme)',
                                                            display:
                                                                editMode && editedCardId === card.id ? 'inline-block' : 'none',
                                                        }}
                                                        onClick={() => handleOpenMediaSelectionModal(card.id)}
                                                    >
                                                        Change
                                                    </Button>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    marginBottom: '2rem',
                                                    gap: '1rem',
                                                }}>
                                                    <h3>Descriptions</h3>
                                                    <p>
                                                        <strong style={
                                                            { color: "var(--themes)" }
                                                        }>Card ID:
                                                        </strong>
                                                        {
                                                            card.id
                                                        }</p>
                                                    <p>
                                                        <strong style={{ color: 'var(--themes)' }}>Title EN:<br /></strong>
                                                        {editMode && editedCardId === card.id ? (
                                                            <Input
                                                                value={editedCard.title_en}
                                                                onChange={(e) => handleFieldChange('title_en', e.target.value)}
                                                            />
                                                        ) : (
                                                            card.title_en
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong style={{ color: 'var(--themes)' }}>Title BN:<br /></strong>
                                                        {editMode && editedCardId === card.id ? (
                                                            <Input
                                                                value={editedCard.title_bn}
                                                                onChange={(e) => handleFieldChange('title_bn', e.target.value)}
                                                            />
                                                        ) : (
                                                            card.title_bn
                                                        )}
                                                    </p>

                                                    <p>
                                                        <strong style={
                                                            { color: "var(--themes)" }
                                                        }>Page Name:<br />
                                                        </strong>
                                                        {
                                                            editMode && editedCardId === card.id ? (
                                                                <Input value={
                                                                    editedCard.page_name
                                                                }
                                                                    onChange={
                                                                        (e) => handleFieldChange('page_name', e.target.value)
                                                                    } />
                                                            ) : (card.page_name)
                                                        }</p>
                                                    <p>
                                                        <strong style={
                                                            { color: "var(--themes)" }
                                                        }>Description EN: <br />
                                                        </strong>
                                                        {
                                                            editMode && editedCardId === card.id ? (
                                                                <RichTextEditor
                                                                    defaultValue={editedCard.description_en}
                                                                    editMode={editMode}
                                                                    onChange={(value) => handleFieldChange('description_en', value)}
                                                                />
                                                            ) : <div dangerouslySetInnerHTML={{ __html: card.description_en }}
                                                                style={{
                                                                    textAlign: "left",
                                                                    fontSize: "1.1rem",
                                                                }} />
                                                        } </p>
                                                    <p>
                                                        <strong style={
                                                            { color: "var(--themes)" }
                                                        }>Description BN:<br />
                                                        </strong>
                                                        {
                                                            editMode && editedCardId === card.id ? (
                                                                <RichTextEditor
                                                                    defaultValue={editedCard.description_bn}
                                                                    editMode={editMode}
                                                                    onChange={(value) => handleFieldChange('description_bn', value)}
                                                                />
                                                            ) : <div dangerouslySetInnerHTML={{ __html: card.description_bn }} style={{
                                                                textAlign: "left",
                                                                fontSize: "1.1rem",
                                                            }} />
                                                        } </p>
                                                </div>
                                                {/* Status toggle button */}
                                                {/* <Switch style={
                                                    { marginTop: "1rem" }
                                                }
                                                    checkedChildren="Active"
                                                    unCheckedChildren="Inactive"
                                                    defaultChecked={
                                                        card.status
                                                    }
                                                    onChange={
                                                        (checked) => {
                                                            instance.put(`/cards/${card.id
                                                                }`, { status: checked }).then((res) => {
                                                                    console.log("Update: ", res);
                                                                });
                                                        }
                                                    } /> */}
                                                <br />
                                                <br />


                                                {
                                                    editMode && editedCardId === card.id ? (
                                                        <div>
                                                            <strong style={
                                                                { color: "var(--themes)" }
                                                            }>Link URL:
                                                            </strong> <br />
                                                            <Input value={
                                                                editedCard.link_url
                                                            }
                                                                onChange={
                                                                    (e) => handleFieldChange('link_url', e.target.value)
                                                                } />
                                                        </div>
                                                    ) : null
                                                }
                                                <p style={{
                                                    fontSize: "1rem",
                                                }}>
                                                    <strong style={
                                                        { color: "var(--themes)" }
                                                    }>Current Link:
                                                    </strong> <br />
                                                    {
                                                        card.link_url ? (
                                                            <Link href={card.link_url}>{card.link_url}</Link>
                                                        ) : (
                                                            "No link available"
                                                        )
                                                    }

                                                </p>


                                                <div style={
                                                    { marginTop: "1rem" }
                                                }>
                                                    <Button type="primary"
                                                        style={
                                                            {
                                                                marginRight: "1rem",
                                                                backgroundColor: "var(--theme)"
                                                            }
                                                        }
                                                        onClick={
                                                            () => toggleEditMode(card)
                                                        }>
                                                        {
                                                            editMode && editedCardId === card.id ? "Submit" : "Edit"
                                                        }
                                                        {' '}
                                                        <EditFilled />
                                                    </Button>
                                                    <Button
                                                        danger
                                                        onClick={
                                                            () => {
                                                                if (editMode && editedCardId === card.id) {
                                                                    setEditedCard(null);
                                                                    setEditedCardId(null);
                                                                    setEditMode(false);
                                                                } else {
                                                                    deleteCard(card.id);
                                                                }
                                                            }
                                                        }>
                                                        {
                                                            editMode && editedCardId === card.id ? "Cancel" : "Delete"
                                                        }
                                                        {' '}
                                                        {
                                                            editMode && editedCardId === card.id ? <CloseCircleOutlined /> : <DeleteOutlined />
                                                        } </Button>
                                                </div>
                                            </AntCard>

                                        </Col>
                                    );
                                })
                            } </Row>

                        <Pagination
                            current={currentPage}
                            total={cardData.length}
                            pageSize={numberOfCardsPerPage}
                            onChange={(page, pageSize) => {
                                setCurrentPage(page);
                            }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "2rem",
                            }}
                        />

                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;

