import React, { useState, useEffect } from "react";
import { Col, Image, Row } from "antd";
import MediaRenderEngine from "./MediaRenderEngine";
const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

const CardListView = ({
    cardData,
    editMode,
}) => {
    return (
        <div>
            <Col>
                {
                    cardData &&
                    cardData?.map((card) => (
                        <Row style={{
                            border: "3px solid var(--theme)",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            padding: "10px",
                            marginBottom: "10px"
                        }}>
                            <Col span={6} style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                {card?.media_files ? (
                                    <MediaRenderEngine item={card?.media_files} />
                                ) : (
                                    <Image
                                        preview={false}
                                        src="/images/Image_Placeholder.png"
                                        alt={card.title_en}
                                        width={200}
                                        height={200}
                                    />
                                )}
                            </Col>
                            <Col span={6} style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}>
                                <h2>{card.title_en}</h2>
                                {
                                    card?.title_bn ? (
                                        <h2>{card.title_bn}</h2>
                                    ) : (
                                        <h2>No Bangla Title</h2>
                                    )
                                }

                            </Col>
                            <Col span={12} style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}>
                                <p style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                }}
                                    dangerouslySetInnerHTML={{
                                        __html: card?.description_en,
                                    }}
                                />
                                {
                                    card?.description_bn ? (
                                        <p style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                            dangerouslySetInnerHTML={{
                                                __html: card?.description_bn,
                                            }}
                                        />
                                    ) : (
                                        <p>No Bangla Description</p>
                                    )
                                }

                            </Col>
                        </Row>
                    ))
                }
            </Col>
        </div>
    );
}

export default CardListView;