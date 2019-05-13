import React from 'react'
import {Grid, Image} from "semantic-ui-react";

export const mobileButtons = {
    home:{
        name :() => (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column>
                    <Image style={{width: 17}} src={process.env.PUBLIC_URL + '/logo.png'}/>
                </Grid.Column>
            </Grid>
        )
    },
    user: {
        name: "",
    },
    messenger:{
        name: "",
    },
    notifications :{
        name: "Messenger",
    },
    logout: {
        name: "",
    },
    size: "small",
    sizeActive: "big",
};

export const computerButtons = {
    home:{
        name :() => (
            <Grid textAlign="center" rows={2}>
                <Grid.Row style={{padding:0}}  height={10}>
                    <Image  style={{height: 34}}  src={process.env.PUBLIC_URL + '/logo.png'}/>
                </Grid.Row>
                <Grid.Row  style={{paddingTop:0}} height={10}>
                    <Image  style={{height: 17}} src={process.env.PUBLIC_URL + '/title.png'}/>
                </Grid.Row>
            </Grid>
        )
    },
    user: {
        name: "User",
    },
    notifications:{
        name: "Notifications",
    },
    messenger:{
        name: "Messenger",
    },
    logout: {
        name: "Logout",
    },
    size: "small",
    sizeActive: "big",
};
