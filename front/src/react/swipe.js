import React, { useState, useEffect } from "react";
import env from "../env";
import Suitor from "./suitor";
import {Button, Header, Segment} from "semantic-ui-react";

const request = (setArray) => {
    let init = {
        method: 'GET',
        headers:{
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/swipe', init)
        .then(response => {
            switch (response.status) {
                case 201:
                    response.json().then(json => {
                        console.log("json", json)
                    });
                    setArray(false);
                    break;
                case 200:
                    response.json().then(json => {
                        setArray(json)
                    });
                    break;
                default:
                    break;
            }
        })
};

function useFetch(url, init) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url, init);
        if (response.status === 201) {
            return [false, false]
        }
        const json = await response.json();
        setData(json);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    const end = data.length < 25 ;
    return [data, setData, loading, end];
}

const Swipe = (props) => {
    let init = {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    const [array, setArray, loading, end] = useFetch(env.api + '/swipe', init);
    const [index, setIndex] = useState(0);
    const next = () => {
        setIndex(index + 1);
    };
    const suitor = array[index];
    if (end && array.length === index) {
        return (
            <Segment>
                <Header>Sorry, we have nobody to recommend to you...</Header>
                <Button onClick={props.toggle}>Search</Button>
            </Segment>
        )
    } else if (array.length < index + 5 && !end) {
        request(setArray);
        setIndex(0);
        return (<Suitor suitor={suitor} next={next}/>)
    } else if (loading) {
        return (<div>...loading</div>)
    } else {
        return (<Suitor suitor={suitor} next={next} toggle={props.toggle}/>)
    }
};

export default (Swipe)
