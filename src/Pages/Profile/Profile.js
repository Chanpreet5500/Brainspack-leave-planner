import React, { useEffect, useState } from 'react';
import {Formik} from 'formik';
import  { Input, Grid, Typography } from '@mui/material';

function ProfileComponent() {

    const userValues = localStorage.getItem('value')
    const finalUserValues = JSON.parse(userValues)

    const dashboardParent = {
        backgroundColor: "#26b78a1c",
        height: "545px",
        width: "95%",
        margin: "20px 0 0 31px",
        borderRadius: "7px",
      };

      const textFields = {
        display: "flex",
        flexDirection: "column",
        marginLeft: "104px",
      };

    return (
        <>  

        <Grid sx={dashboardParent}>
        
        <Grid>
          <Typography variant="h5" style={{fontSize: '4rem', padding: '20px 0 20px 30px'}}>User Information :- </Typography>
        </Grid>
        
      
            <Formik
                initialValues = {{
                    firstName : finalUserValues?.firstName,
                    lastName : finalUserValues?.lastName,
                    email : finalUserValues?.email,
                    birthday : finalUserValues?.birthDate,
                    designation : finalUserValues?.designation
                }}
                validate = {(values) => {
                    const errors = {}
                    if(!values.email){
                        errors.email = 'Required'
                    } else if(!values.firstName){
                        errors.firstName = 'Required'
                    } else if(!values.lastName){
                        errors.lastName = 'Required'
                    } else if(!values.birthday){
                        errors.birthday = 'Required'
                    } else if(!values.designation){
                        errors.designation = 'Required'
                    } else if(!values.password){
                        errors.password = 'Required'
                    } 
                        return errors;
                }} >
                    {(props) => {
                        console.log(props, "PROPS")
                        return (
                            <>
                            <Grid sx={textFields}>
                                <Input
                                    name = 'firstName'
                                    value={props.values.firstName }
                                    onChange = {props.handleChange} />
                                <Input
                                    name = 'lastName'
                                    value={props.values.lastName }
                                    onChange = {props.handleChange} />
                                <Input
                                    name = 'email'
                                    value={props.values.email }
                                    onChange = {props.handleChange} />
                                <Input
                                    name = 'birthday'
                                    value={props.values.birthday }
                                    onChange = {props.handleChange} />
                                <Input
                                    name = 'designation'
                                    value={props.values.designation }
                                    onChange = {props.handleChange} />
                               </Grid>
                            </>
                        )
                    }}

            </Formik>
            </Grid>
        </>
    )
}

export default ProfileComponent;