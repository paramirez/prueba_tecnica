import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { Calendar } from "../context/CalendarContext";
import * as gapi from "../clients/gapi";
import { List, Typography, Divider } from "antd";

const CalendarPage = () => {
  const { user, getCalendar, suscribeCalendar } = useContext(Calendar);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const call = async () => setEvents(await getCalendar());
    call();
  }, [getCalendar]);

  const dayAndTime = (time) => moment(time).format("ddd DD-MMM-YYYY, hh:mm A");

  const cancelEvent = async (id) => {
    const res = await gapi.cancelEvent(id);
    console.log(res);
    setEvents(events.filter((e) => e.id !== id));
  };
  const listEvents = events.map((event, index) => (
    <li key={index}>
      {event.summary}
      {dayAndTime(event.start.dateTime)}
    </li>
  ));

  return (
    <div>
      {user && user._extraData && !user._extraData.calendar ? (
        <button onClick={suscribeCalendar}>Vincular google calendar</button>
      ) : (
        <div>
          <Divider orientation="left">Eventos para el siguiente mes</Divider>
          <List
            size="large"
            bordered
            dataSource={events}
            renderItem={(item) => (
              <List.Item>
                {item.summary}

                <button onClick={() => cancelEvent(item.id)}>remove</button>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
