import React from "react";
import { useState, useEffect } from "react";
import './AllCss/AllData.css'


function AllData({ state }) {

    const [Search , SetSearch] = useState('');
    const [data, setData] = useState([]);
    const { contract } = state;


    useEffect(() => {
        const AllData = async () => {
            const mydata = await contract.getMemos();
            setData(mydata);
        };
        contract && AllData();
    }, [contract]);



    const ALLDATA = data.filter((item) =>{
        return Search.toLowerCase() === '' ? true :
        item.name.toLowerCase().includes(Search);
    }).map((value) => {
        return (<tr key={value.timestamp}>
            <td>{value.name}</td>
            <td>{String(value.value / 1000000000000000000)}</td>
            <td>{value.from}</td>
            <td>{new Date(value.timestamp * 1000).toLocaleString()}</td>
            <td>{value.message}</td>
        </tr>)
    })

    

    return (
        <div className="container - 1">
            <div className="container-2">
                <h2>All Udhari</h2>
                <input type="text" id="myInput" onChange={(e) =>{SetSearch(e.target.value.toLowerCase())}} placeholder="Search for names.." title="Type in a name"></input>
            </div>
            <table id="myTable">
                <tbody>
                    <tr key={1}>
                        <th>Name</th>
                        <th>Amount(ETH)</th>
                        <th>From</th>
                        <th>TimeStamp</th>
                        <th>Message</th>
                    </tr>
                    {ALLDATA}
                </tbody>
            </table>
        </div>
    )
};

export default AllData;