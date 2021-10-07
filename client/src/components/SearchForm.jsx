import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';

const SearchForm = (props) => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState("br1");
    const [users, setUsers] = useState([]);
    const history = useHistory();
    
    const removeFromDom = userId => {
        setUsers(users.filter(user => user._id !== userId));
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/api/users')
            .then(res=>{
                setUsers(res.data.allUsersArray);
            })
            .catch(err => console.error(err));
    },[]);

    const sendSearch = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users', {
            name,
            region
        })
        .then(res=>{
            setName(res.data.name);
            setRegion(res.data.region);
        })
        .catch(err => console.log(err))
        console.log(name)
        console.log(region)
        
        history.push(`/${region}/${name}`);
    }

    const deleteUser = (userId) => {
        axios.delete('http://localhost:8000/api/users/' + userId)
            .then(res => {
                removeFromDom(userId)
            })
            .catch(err => console.error(err));
    }



    return (
        <div>
            <fieldset>
                <form onSubmit = {sendSearch}>
                    <label>Search for Summoner: </label>
                    <select type="text" onChange={(e) => setRegion(e.target.value)} value={region}>
                        <option value="br1">BR1</option>
                        <option value="eun1">EUN1</option>
                        <option value="euw1">EUW1</option>
                        <option value="jp1">JP1</option>
                        <option value="kr">KR</option>
                        <option value="la1">LA1</option>
                        <option value="la2">LA2</option>
                        <option value="na1">NA1</option>
                        <option value="oc1">OC1</option>
                        <option value="ru">RU</option>
                        <option value="tr1">TR1</option>
                    </select>
                    <label>Summoner Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    <input type="submit" value="Search"/>
                </form>
            </fieldset>
            <fieldset>
                {users.map((user, i) =>
                    <div>
                        <p>
                            {i < 21 ? <Link to={"/"+user.region+"/"+user.name}>{user.name}{user.like ? "*" : ""}</Link> : ""}
                            <button onClick = {(e)=> {deleteUser(user._id)}}>X</button>
                        </p>
                    </div>
                )}
            </fieldset>
        </div>
    );
}

export default SearchForm