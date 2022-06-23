import React, { useEffect, useState } from "react";
import { withStreamingV2 } from "@msf/msf-reactjs-weblib-base";
import { symbolData } from "../symbolData";
import "../assets/css/HOC.css"

const HOC = (props) => {

    // const [symbolArray, setSymbolArray] = useState([])
    // const [streamingRes, setStreamingRes] = useState([])

    const [symbolList, setSymbolList] = useState([]);
    const [streamingResp, setStreamingResp] = useState(null);


    const company_name = "WATCHLIST_LARGE"

    useEffect(() => {
        props.registerStreamCB(onStreamCB, company_name);
        streamSub(symbolData)
    }, [])

    useEffect(() => {
        if (streamingResp && streamingResp !== {})
            setStreamingResptoSymbols(streamingResp)
    }, [streamingResp])


    function setStreamingResptoSymbols(resp) {

        // console.log("resp", resp);
        let { data } = resp;
        let newList = symbolList.map(row => {
            if (row.sym.streamSym === data.symbol) {
                // row = Object.assign({}, row, data);

                let cssClasses = {
                    ltpClasses: '',
                    chngClasses: '',
                    chngperClasses: '',
                    volClasses: '',
                }

                if (row?.ltp > data?.ltp) {
                    cssClasses['ltpClasses'] = 'negative'
                } else {
                    cssClasses['ltpClasses'] = 'positive'
                }

                if (row?.chng > data?.chng) {
                    cssClasses['chngClasses'] = 'negative'
                } else {
                    cssClasses['chngClasses'] = 'positive'
                }

                if (row?.chngPer > data?.chngPer) {
                    cssClasses['chngperClasses'] = 'negative'
                } else {
                    cssClasses['chngperClasses'] = 'positive'
                }

                if (row?.vol > data?.vol) {
                    cssClasses['volClasses'] = 'negative'
                } else {
                    cssClasses['volClasses'] = 'positive'
                }




                row = Object.assign({}, row, data, cssClasses);
                console.log("final row", row);
            }
            // console.log("row", row);
            return row;
        })
        // console.log("newList", newList);
        // setSymbolList(prevState => {
        //     // console.log("prevState", prevState);
        //     // console.log("newList", newList);
        //     colorData(prevState, newList)
        //     return newList
        // })
        setSymbolList(newList)



        console.log("final symbolList", symbolList);

    }

    // function colorData(row, data) {
    //     // console.log("row", row);
    //     // console.log("symbolList", symbolList);
    //     // console.log("data", data);



    //     return data
    // }

    function streamSub(list) {
        console.log("list", list);
        const symbolArray = list.map((item) => item.sym);
        setSymbolList(list)
        props.subscribeLevel1(symbolArray)
    }

    // console.log("myData", returnValue);


    function onStreamCB(resp) {
        setStreamingResp(resp)
    }

    return (<div className="table_container">

        {/* <p className="company_name">Company Name: <b> {company_name} </b></p> */}

        <table>
            <thead>
                <tr>
                    <th>Display Name</th>
                    <th>LTP</th>
                    <th>CHNG</th>
                    <th>CHNGPER</th>
                    <th>VOL</th>
                </tr>
            </thead>
            <tbody>
                {
                    symbolList.map((item, index) => {

                        return <tr key={index}>
                            <td>{item.dispSym}</td>
                            <td>{
                                <span className={item.ltpClasses}> {item.ltp} </span>
                            }</td>
                            <td>{
                                <span className={item.chngClasses}> {item.chng} </span>
                            }</td>
                            <td>{
                                <span className={item.chngClasses}> {item.chngPer} </span>
                            }</td>
                            <td>{
                                <span className={item.volClasses}> {item.vol} </span>
                            }</td>
                        </tr>
                    })
                }

            </tbody>
        </table>
    </div>)
}

export default withStreamingV2(HOC)