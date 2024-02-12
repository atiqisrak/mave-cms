import { Col, Image, Row } from "antd";
import React from "react";

const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

const CardGridView = ({
    cardData,
    editMode,
}) => {

    return (
        <div>
            <Row gutter={[16, 16]}>
                {cardData?.map((card) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                        <div style={{
                            textAlign: 'center',
                            border: "3px solid var(--theme)",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            padding: "10px"
                        }}>
                            <Image
                                preview={false}
                                src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                alt={card.title_en}
                                width={200}
                                height={200}
                            />
                            <div style={{
                                padding: "10px 0",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px"
                            }}><h2>{card.title_en}</h2>
                                <p
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: card?.description_en,
                                    }}
                                /></div>

                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default CardGridView;
