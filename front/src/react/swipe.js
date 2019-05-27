import React, { useState, useEffect } from "react";
import {Container, Responsive} from "semantic-ui-react";
import env from "../env";
import Suitor from "./suitor";

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
    return [data, setData, loading];
}

const Swipe = (props) => {
    let init = {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    const [array, setArray, loading] = useFetch(env.api + '/swipe', init);
    const [index, setIndex] = useState(0);
    const next = () => {
        setIndex(index + 1);
        console.log(index);
    };
    const suitor = array[index];
    if (array.length < index + 3 && array.length > 0) {
        console.log("if 1");
        request(setArray);
        setIndex(0);
        console.log(array);
        return (
            <Suitor suitor={suitor} next={next}/>
        )
    } else if (loading) {
        console.log("if 2", suitor);
        return (
            <div>...loading</div>
        )
    } else if (!array) {
        console.log("if 3");
        return (
            <div>Nothing left</div>
        )
    } else {
        console.log("if 4", suitor);
        return (
            <Suitor suitor={suitor} next={next}/>
        )
    }
};

export default (Swipe)
