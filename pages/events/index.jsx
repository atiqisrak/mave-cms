// pages/events/index.jsx

import { message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { useRouter } from "next/router";
import PagesHeader from "../../components/PageBuilder/PagesHeader";
import RenderEvents from "../../components/events/RenderEvents";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [sortType, setSortType] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const router = useRouter();

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/pages?type=Event");
      if (response.data) {
        setEvents(response.data);
      } else {
        message.error("Failed to fetch events.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      message.error("An error occurred while fetching events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Sort events whenever sortType changes
  useEffect(() => {
    const sortedEvents = [...events].sort((a, b) => {
      if (sortType === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setEvents(sortedEvents);
  }, [sortType]);

  const handleExpand = (eventId) => {
    setExpandedEventId((prevId) => (prevId === eventId ? null : eventId));
  };

  const openCreateEventPage = () => {
    router.push("/events/create");
  };

  const handleDeleteEvent = async (deleteEventId) => {
    try {
      await instance.delete(`/pages/${deleteEventId}`);
      message.success("Event deleted successfully.");
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== deleteEventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
      message.error("An error occurred while deleting the event.");
    }
  };

  const handleEditEvent = (id) => {
    router.push(`/events/${id}`);
  };

  const handleEditEventInfo = async (updatedData) => {
    try {
      const response = await instance.put(`/pages/${updatedData.id}`, {
        page_name_en: updatedData.pageNameEn,
        page_name_bn: updatedData.pageNameBn,
        slug: updatedData.slug,
        additional: [
          {
            pageType: "Event",
            metaTitle: updatedData.metaTitle,
            metaDescription: updatedData.metaDescription,
            keywords: updatedData.keywords,
            metaImage: updatedData.metaImage,
            metaImageAlt: updatedData.metaImageAlt,
          },
        ],
      });
      if (response.status === 200) {
        message.success("Event info updated successfully.");
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updatedData.id ? { ...event, ...updatedData } : event
          )
        );
      } else {
        message.error("Failed to update event info.");
      }
    } catch (error) {
      console.error("Error updating event info:", error);
      message.error("An error occurred while updating the event info.");
    }
  };

  const handleEventSearch = (searchText) => {
    if (searchText.trim() === "") {
      fetchEvents();
      return;
    }
    const filteredEvents = events.filter((event) =>
      event.page_name_en.toLowerCase().includes(searchText.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  const handleShowChange = (value) => {
    setItemsPerPage(value);
  };

  const handleFilter = () => {
    message.info("Filter functionality is not implemented yet.");
  };

  if (loading) {
    return (
      <div className="mavecontainer flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl p-4">
      <PagesHeader
        onSearch={handleEventSearch}
        onCreate={openCreateEventPage}
        sortType={sortType}
        setSortType={setSortType}
        onShowChange={handleShowChange}
        handleFilter={handleFilter}
        title="Events"
      />

      <RenderEvents
        events={events.slice(0, itemsPerPage)}
        handleEditEvent={handleEditEvent}
        handleExpand={handleExpand}
        expandedEventId={expandedEventId}
        handleDeleteEvent={handleDeleteEvent}
        handleEditEventInfo={handleEditEventInfo}
      />
    </div>
  );
};

export default Events;
