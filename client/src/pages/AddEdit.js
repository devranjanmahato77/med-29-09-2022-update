import React,{useState,useEffect} from "react";
import {useHistory, useParams, Link, useNavigate} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    pan: "",
    gst: "",
    acc: "",
}

const AddEdit = () =>{
    const [state, setState] = useState(initialState);
    
    const {name,pan,gst,acc} = state;
    
    // const history = useHistory();

    const navigate = useNavigate();

    const {id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:1024/api/get/${id}`).then((resp)=>setState({...resp.data[0]}))
    },[id])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name || !pan || !gst || !acc){
            toast.error("Provide all details");
        }else{
            axios.post("http://localhost:1024/api/post",{
                name,
                pan,
                gst,
                acc
            }).then(()=>{
                setState({name:"",pan:"",gst:"",acc:""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Detail added successfully");
            // setTimeout(() => history.push("/"),500);
            setTimeout(() => navigate('/'),500);
        }
    };

    const handleInputChange=(e)=>{
        const {name,value} = e.target;
        setState({...state, [name]:value});
    };
    return (
        <div>
{/* <h2>Edit</h2> */}
        <div style={{marginTop:"100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent:"center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor = "name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name" value={name||""} onChange={handleInputChange}/>
                <label htmlFor = "pan">PAN</label>
                <input type="text" id="pan" name="pan" placeholder="PAN Number" value={pan||""} onChange={handleInputChange}/>
                <label htmlFor = "gst">GST ID</label>
                <input type="text" id="gst" name="gst" placeholder="GST ID" value={gst||""} onChange={handleInputChange}/>
                <label htmlFor = "acc">Account No.</label>
                <input type="text" id="acc" name="acc" placeholder="Account Number" value={acc||""} onChange={handleInputChange}/>

                <input type="submit" value="Save"/>
                <Link to="/">
                    <input type="button" value="Back"/>
                </Link>
            </form>
        </div>
        </div>
    )
}

export default AddEdit;