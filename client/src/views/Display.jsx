import axios from 'axios';
import React from 'react';
import {useEffect, useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import champions from 'lol-champions';

const Display = (props) => {

  const [summoner, setSummoner] = useState([]);
  const [puuid, setPuuid] = useState("");
  const {region, name} = useParams();
  const [matchid, setMatchid] = useState([]);
  const [summonerId, setSummonerId] = useState("");
  let region2 = "";
  
    if(region === "na1"){
        region2 = "americas";
    }
    else if(region === "kr1"){
        region2 = "asia";
    }

    

    useEffect( () => {
        axios.get("https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key=RGAPI-81799cc3-1374-4dc5-ad8c-fb7d59f29b4d")
            .then(res => {
                console.log(res.data);
                setSummoner(res.data);
                setPuuid(res.data.puuid);
                setSummonerId(res.data.id);
            })
            .catch(err => console.log(err));
            
    },[name]);

    useEffect( () => {
        axios.get("https://"+region2+".api.riotgames.com/lol/match/v5/matches/by-puuid/"+puuid+"/ids?start=0&count=20&api_key=RGAPI-81799cc3-1374-4dc5-ad8c-fb7d59f29b4d")
            .then(res => {
                console.log(res.data);
                setMatchid(res.data);
            })
            .catch(err => console.log(err));
    },[puuid]);


    return (
        <div>
            <h1>Summoner Name: {name}</h1>
            <p>Summoner Level: {summoner.summonerLevel}</p>
            <p>Lists of Matches: </p>
            {matchid.map( (match, i) =>
                <div key={i} style={{marginTop:"5px"}}>
                    <Link to={"/"+region+"/"+name+"/"+match}>
                        Match {i+1}
                    </Link>
                </div>
            )}
            <br/>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
                <Link to={"/home"}>Home</Link> <Link to={"/"+region+"/game/info/"+summonerId}>Current Game Info</Link> 
            </div>
        </div>
    )


}

export default Display;