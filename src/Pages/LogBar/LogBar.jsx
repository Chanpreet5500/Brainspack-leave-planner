import { ArrowBackIos, ArrowForwardIos, ExpandMore } from '@mui/icons-material'
import { Avatar, Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

const LogBar = ({ data }) => {
    const { log, setLog, navBarDate, setNavbarDate, weekFIrstDay, setWeekFirstDay, weekLastDay, setWeekLastDay } = data


    //     const [log, setLog] = React.useState('daily')
    //   const [navBarDate, setNavbarDate] = React.useState({
    //     formatDate: new Date(),
    //     date: 'Today'
    //   })
    //   const [weekFIrstDay, setWeekFirstDay] = React.useState('')
    //   const [weekLastDay, setWeekLastDay] = React.useState('')



    const date = new Date();
    const formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    const handleChange = (event) => {
        setLog(event.target.value)
    }

    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec']
    const setDateBackward = () => {

        if (log != 'weekly') {
            const newFormatDate = new Date(navBarDate.formatDate.getFullYear(), navBarDate.formatDate.getMonth(), navBarDate.formatDate.getDate() - 1)
            const month = newFormatDate.getMonth();
            const newDate = ` ${newFormatDate.getDate()}-${months[month]}-${newFormatDate.getFullYear()}`
            setNavbarDate({
                formatDate: newFormatDate,
                date: newDate
            })
        } else {
            const newFirstFormatDate = new Date(weekFIrstDay.formatDate.setDate(weekFIrstDay.formatDate.getDate() - 7))
            const newLastFormatDate = new Date(weekLastDay.formatDate.setDate(weekLastDay.formatDate.getDate() - 7))

            const firstDayDateStyle = `${newFirstFormatDate.getDate()}-${months[newFirstFormatDate.getMonth()]}-${newFirstFormatDate.getFullYear
                ()}`
            const LastDayDateStyle = `${newLastFormatDate.getDate()}-${months[newLastFormatDate.getMonth()]}-${newLastFormatDate.getFullYear
                ()}`

            setWeekFirstDay({
                formatDate: newFirstFormatDate,
                date: firstDayDateStyle
            })
            setWeekLastDay({
                formatDate: newLastFormatDate,
                date: LastDayDateStyle
            })
        }
    }

    const setDateForward = () => {
        if (log != "weekly") {
            const newFormatDate = new Date(navBarDate.formatDate.getFullYear(), navBarDate.formatDate.getMonth(), navBarDate.formatDate.getDate() + 1)
            const month = newFormatDate.getMonth();
            const newDate = ` ${newFormatDate.getDate()}-${months[month]}-${newFormatDate.getFullYear()}`
            setNavbarDate({
                formatDate: newFormatDate,
                date: newDate
            })
        } else {
            const newFirstFormatDate = new Date(weekFIrstDay.formatDate.setDate(weekFIrstDay.formatDate.getDate() + 7))
            const newLastFormatDate = new Date(weekLastDay.formatDate.setDate(weekLastDay.formatDate.getDate() + 7))

            const firstDayDateStyle = `${newFirstFormatDate.getDate()}-${months[newFirstFormatDate.getMonth()]}-${newFirstFormatDate.getFullYear
                ()}`
            const LastDayDateStyle = `${newLastFormatDate.getDate()}-${months[newLastFormatDate.getMonth()]}-${newLastFormatDate.getFullYear
                ()}`

            setWeekFirstDay({
                formatDate: newFirstFormatDate,
                date: firstDayDateStyle
            })
            setWeekLastDay({
                formatDate: newLastFormatDate,
                date: LastDayDateStyle
            })
        }
    }

    const compareDate = () => {
        const tempDate = navBarDate.formatDate
        const dateToCheck = `${tempDate.getFullYear()}/${tempDate.getMonth()}/${tempDate.getDate()}`
        const dateForToday = `${tempDate.getFullYear()}/${tempDate.getMonth()}/${tempDate.getDate() + 1}`
        const date = new Date()
        const currDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        if (dateForToday == currDate) {
            setNavbarDate({
                formatDate: new Date(),
                date: "Today"
            })
        } else if (dateToCheck != currDate || log == 'weekly') {
            setDateForward()
        }
    }




    const firstDay = date.getDate() - date.getDay() + 1;
    const lastDay = firstDay + date.getDay() + 1

    const firstDayOfWeek = new Date(date.setDate(firstDay))
    const lastDayOfWeek = new Date(date.setDate(lastDay - 2))

    const firstDayFormat = `${firstDayOfWeek.getDate()}-${months[firstDayOfWeek.getMonth()]}-${firstDayOfWeek.getFullYear()}`
    const lastDayFormat = `${lastDayOfWeek.getDate() - 2}-${months[lastDayOfWeek.getMonth()]}-${lastDayOfWeek.getFullYear()}`


    React.useEffect(() => {
       
        if (log == 'weekly') {
            setWeekFirstDay({
                formatDate: firstDayOfWeek,
                date: firstDayFormat
            })
            setWeekLastDay({
                formatDate: lastDayOfWeek,
                date: lastDayFormat
            })
        }

    }, [log])
    return (
        <Box sx={{
            width: "100%", height: "4rem", backgroundColor: "#c0c0c099", boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)", borderRadius: '5px', marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>

            <Box sx={{ display: "flex", alignItems: "center", pl: "20px", gap: "10px" }}>
                <ArrowBackIos sx={{ color: "blue" }} fontSize='small' />
                <Avatar src="/broken-image.jpg" />
                <Box component='p' sx={{ color: "#565454" }}>Tushar Maheshwari</Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <ArrowBackIos sx={{
                    color: "gray", cursor: "pointer", "&:hover": {
                        color: 'black'
                    }
                }} fontSize='small' onClick={() => { setDateBackward() }} />
                {log == 'daily' ?
                    <Box component='p' >{navBarDate.date}</Box>
                    :
                    <Box component='p'>
                        {weekFIrstDay.date} - {weekLastDay.date}
                    </Box>
                }

                <ArrowForwardIos sx={{
                    color: "gray", cursor: 'pointer', "&:hover": {
                        color: 'black'
                    }
                }} fontSize='small' onClick={compareDate} />
            </Box>


            <Box sx={{ mr: "20px" }}>
                <FormControl fullWidth>
                    <Select
                        variant='filled'
                        sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, '& .MuiInputBase-input': { paddingTop: "10px", backgroundColor: "#4189e1", color: "White", borderRadius: "5px" }, "& .MuiSvgIcon-root": { color: "white " } }}
                        IconComponent={ExpandMore}

                        disableUnderline={true}

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={log ? log : 'daily'}
                        label="LogTime"
                        onChange={handleChange}
                    >
                        <MenuItem value={'daily'}>Daily Log</MenuItem>
                        <MenuItem value={'weekly'}>Weekly Log</MenuItem>

                    </Select>
                </FormControl>
            </Box>


        </Box>
    )
}

export default LogBar
