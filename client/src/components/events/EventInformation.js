import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "reactstrap";
import DataEventDate from "./DataEventDate.js";
import DataEventInfo from "./DataEventInfo.js";
import DataEventUser from "./DataEventUser.js";
import MainChatEvent from "./MainChatEvent.js";

const EventInformation = () => {
  const [data, eventData] = useState();
  const [urlmap, Seturlmap] = useState("");
  const [colorOption, SetColorOption] = useState({
    date: "primary",
    info: "secondary",
    user: "secondary",
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/event/${id}`)
      .then((res) => {
        eventData(res.data);
        Seturlmap(
          `<iframe src='https://maps.google.com/maps?q=${res?.data?.eventLocation}&amp;output=embed' width='90%' height='380' /> `
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-event-route">
      <div className="row" id="event-information">
        <div className="col-sm-6">
          <div className="main-eve-info">
            <div className="row">
              <div className="col-sm-3">
                <Button
                  color={colorOption.date}
                  className="btn-info-event btn-top-eve"
                  onClick={() => SetColorOption({ date: "primary" })}
                >
                  Event Date
                </Button>
                <Button
                  color={colorOption.info}
                  className="btn-info-event"
                  onClick={() => SetColorOption({ info: "primary" })}
                >
                  Information
                </Button>
                <Button
                  color={colorOption.user}
                  className="btn-info-event"
                  onClick={() => SetColorOption({ user: "primary" })}
                >
                  Users
                </Button>
              </div>
              <div className="col-sm-9 eve-info">
                {colorOption.date === "primary" ? (
                  <DataEventDate data={data} />
                ) : null}
                {colorOption.info === "primary" ? (
                  <DataEventInfo data={data} />
                ) : null}
                {colorOption.user === "primary" ? (
                  <DataEventUser data={data} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {urlmap ? (
          <div className="col-sm-6">
            <div
              dangerouslySetInnerHTML={{
                __html:
                urlmap
              }}
            />
          </div>
        ) : (
          <p>Evento sin localización</p>
        )}
      </div>
      <MainChatEvent id = {id}/>
    </div>
  );
};

export default EventInformation;
