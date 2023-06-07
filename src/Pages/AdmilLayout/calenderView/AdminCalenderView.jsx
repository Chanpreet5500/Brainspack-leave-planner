import React, { useEffect, useState } from "react";
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
import { GetLeaveDataForAdmin } from "../../ReactQuery/CustomHooks/LeavePlanner";
import {
  Heading,
  MainContainer,
} from "../../TimeTracker/CalendarView/CalenderStyled";
import CloseIcon from "@mui/icons-material/Close";
import CalendarModalComponent from "../../TimeTracker/CalendarView/CalendarModal";
import Loader from "../../Loader/Loader";
import { FullCalender } from "../../FullCalender/FullCalender";

export const AdminCalenderView = () => {
  const [userId, setUserId] = useState("all-users");
  const [colorToUser, setColorToUser] = useState([]);
  const [dropdown, setDropdown] = useState("all-users");
  const [dropDownList, setDropdownList] = useState([]);
  const [leavesData, setLeavesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState([]);

  const { data, isFetching } = useQuery("employee-list", () => {
    return axios.get("http://localhost:5233/getEmpList");
  });
  const employeeList = data?.data?.userList;
  const { data: apiData, refetch: refetedUser } = GetLeaveDataForAdmin(userId);

  const changeDropDown = (event) => {
    setDropdown(event.target.value);
    setUserId(event.target.value);
    refetedUser();
  };

  useEffect(() => {
    let arrayOfColor = [];
    employeeList?.map(element => {
      arrayOfColor.push({
        _id: element._id,
        userColor: setRandomColor(),
      });
    });
    setColorToUser(arrayOfColor);
    setDropdownList(employeeList);
  }, [data]);

  const randomColorForNames = (name) => {
    const givenColor = colorToUser.filter((element) => element._id === name);
    return givenColor[0]?.userColor;
  };

  useEffect(() => {
    if (apiData && colorToUser) {
      const allLeaves = apiData?.data?.data?.map((e) => {
        let colorValue = randomColorForNames(e.userId?._id);
        return {
          start: e.leaveDates,
          title: e.userId?.firstName + " " + e.userId?.lastName,
          allDay: true,
          display: e.description,
          constraint: e.userId?.firstName,
          id: e._id,
          backgroundColor: colorValue,
          borderColor: colorValue,
          textColor: "black",
          extendedProps: {
            type: e.leaveType,
            firstName: e.userId?.firstName,
            lastName: e.userId?.lastName,
            status:e.status,
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
      status: events.event.extendedProps.status,
    });
  }
  const setRandomColor = () => {
    let letters = "BCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  return (
    <>
      {isFetching ? <Loader /> : ""}
      <MainContainerCalender>
        <CalendarContainer>
          <DropDown
            value={dropdown}
            onChange={(e)=>changeDropDown(e)}
          >
            <MenuItem  value={"all-users"}>
              <em>All User Data</em>
            </MenuItem>
            {dropDownList?.map((element) => {
              return( 
                <CustomMenu key={element._id} value={element._id}>
                  <Typography>
                    {element.firstName + " " + element.lastName}
                  </Typography>
                  <CustomBox
                    sx={{ background: randomColorForNames(element._id) }}
                  ></CustomBox>
                </CustomMenu>
              );
            })}
          </DropDown>
        </CalendarContainer>
        <CalendarContainer>
          <FullCalender
          events={leavesData}
          eventClick={visibleModal}
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
            <CalendarModalComponent eventVal={event} admin={true} setShowModal={setShowModal} />
          </MainContainer>
        </Modal>
      </MainContainerCalender>
    </>
  );
};
