import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data, setData]=useState([]);

    const loadData = async () =>{
        const response = await axios.get("http://localhost:1024/api/get");
        setData(response.data);
        console.log(response.data);
    };

    useEffect(()=>{
        loadData();
    }, []);

    const deleteContact = (id) => {
        if(window.confirm("Are you sure to delete?")){
            axios.delete(`http://localhost:1024/api/remove/${id}`);
            toast.success("Record deleted successfully.");
            setTimeout(() => loadData(),500);
        }
    }
    return(
        <div style={{marginTop: "150px"}}>

            <Link to="/addContact">
                <button className="btn btn-contact">Add</button>
            </Link>

            <table className="styled-table" border="1">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Sno.</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>PAN no.</th>
                        <th style={{textAlign: "center"}}>GST no.</th>
                        <th style={{textAlign: "center"}}>Account no.</th>
                        <th style={{textAlign: "center"}}>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>{
                        return(
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.pan}</td>
                                <td>{item.gst}</td>
                                <td>{item.acc}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                    <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={()=>deleteContact(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* <h2>HOME</h2> */}
        </div>
    )
}

export default Home;