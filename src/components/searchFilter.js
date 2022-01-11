import React, { useState } from "react";
import axios from 'axios';
import SearchInput from "./searchBar";

const API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;




function SearchFilter() {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);


    const getAPIResponse = (val) => {
        var config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        let result = axios.get(`${API_URL}`, config).then((res) => {
            if (val) {
                setLoading(true);
                let response = res.data;
                setOptions(response);
                setLoading(false);
            } else {
                setOptions([]);
            }
            return res.data
        });
        return result;
    }
    return <div className="wrapper">
        <SearchInput
            loading={loading}
            options={options}
            requests={getAPIResponse}
        />
    </div>
};


export default SearchFilter;