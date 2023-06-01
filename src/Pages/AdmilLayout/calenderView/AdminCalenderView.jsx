import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {
  CalendarContainer,
  CustomBox,
  CustomMenu,
  DropDown,
  MainContainerCalender,
} from "./styled";
import { Box, MenuItem, Modal, Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { GetLeaveDataById } from "../../ReactQuery/CustomHooks/LeavePlanner";
import {
  Heading,
  MainContainer,
} from "../../TimeTracker/CalendarView/CalenderStyled";
import CloseIcon from "@mui/icons-material/Close";
import CalendarModalComponent from "../../TimeTracker/CalendarView/CalendarModal";

const employeLeaveColor = [
  "#f31010eb",
  "#008000de",
  "#2d8ceb",
  "yellow",
  "purple",
  "orange",
  "pink",
];

export const AdminCalenderView = () => {
  const localData = JSON.parse(localStorage.getItem("value"));
  const { _id } = localData;
  const [userId, setUserId] = useState("all-users");
  const [colorToUser, setColorToUser] = useState([]);
  const [dropdown, setDropdown] = useState("all-users");
  const [dropDownList, setDropdownList] = useState([]);
  const [leavesData, setLeavesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState([]);

  const { data, refetch } = useQuery("employee-list", () => {
    return axios.get("http://localhost:5233/getEmpList");
  });
  const employeeList = data?.data?.userList;
  const { data: apiData, refetch: refetedUser } = GetLeaveDataById(
    userId,
    "my_leave"
  );

  console.log(apiData);

  const handleChange = (event) => {
    setUserId(event.target.value);
    setDropdown(event.target.value);
    refetedUser();
  };

  useEffect(() => {
    let arrayOfColor = [];
    employeeList?.map((element, index) => {
      arrayOfColor.push({
        firstName: element.firstName,
        userColor: employeLeaveColor[index],
      });
    });
    setColorToUser(arrayOfColor);
    setDropdownList(employeeList);
  }, [data]);

  const putColor = (name) => {
    const givenColor = colorToUser.filter(
      (element) => element.firstName === name
    );
    return givenColor[0]?.userColor;
  };

  useEffect(() => {
    if (apiData && colorToUser) {
      const allLeaves = apiData?.data?.data?.map((e, i) => {
        let colorValue = putColor(e.userId?.firstName);
        return {
          start: e.leaveDates,
          title: e.userId.firstName + " " + e.userId.lastName,
          allDay: true,
          display: e.description,
          constraint: e.userId?.firstName,
          id: e._id,
          backgroundColor: colorValue,
          borderColor: colorValue,
          extendedProps: {
            type: e.leaveType,
            firstName: e.userId.firstName,
            lastName: e.userId.lastName,
          },
        };
      });

      setLeavesData(allLeaves);
    }
  }, [apiData, colorToUser]);

  function visibleModal(events) {
    setShowModal(true);
    setEvent({
      title: events.event.title,
      start: events.event.start,
      hours: events.event.extendedProps.hours,
      description: events.event.extendedProps.description,
      end: events.event.end,
      eventId: events.event.id,
      type: events.event.extendedProps.type,
      firstName: events.event.extendedProps.firstName,
      lastName: events.event.extendedProps.lastName,
    });
  }

  return (
    <>
      <MainContainerCalender>
        <CalendarContainer>
          <DropDown
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={dropdown}
            onChange={handleChange}

          >
            <MenuItem selected value={"all-users"}>
              <em>All User Data</em>
            </MenuItem>
            {dropDownList?.map((element, index) => {
              return (
                <CustomMenu value={element._id}>
                  <Typography>
                    {element.firstName + " " + element.lastName} 
                  </Typography>
                  <CustomBox  
                    sx={{ background: putColor(element.firstName) }}
                  ></CustomBox>
                </CustomMenu>
              );
            })}
          </DropDown>
        </CalendarContainer>
        <CalendarContainer>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            events={leavesData?.length ? leavesData : []}
            eventClick={(e) => (e ? visibleModal(e) : "")}
          />
        </CalendarContainer>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ width: "100%" }}
        >
          <MainContainer>
            <Box sx={{ float: "right", display: "block" }}>
              <CloseIcon onClick={() => setShowModal(false)} />
            </Box>
            <Heading id="modal-modal-title" variant="h4" component="h2">
              Leaves Data
            </Heading>
            <CalendarModalComponent eventVal={event} admin={true} />
          </MainContainer>
        </Modal>
      </MainContainerCalender>
    </>
  );
};
