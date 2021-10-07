import axios from 'axios';
import React from 'react';
import {useEffect, useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import champions from 'lol-champions';


const MatchDisplay = (props) => {

    const {region, name, matchid} = useParams();
    const [gameInfo, setGameInfo] = useState([]);
    const [teamInfo, setTeamInfo] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [firstTeam, setFirstTeam] = useState([]);
    const [firstTeamKills, setFirstTeamKills] = useState();
    const [secondTeamKills, setSecondTeamKills] = useState();
    const [secondTeam, setSecondTeam] = useState([]);

    let region2 = "";
  
    if(region === "na1"){
        region2 = "americas";
    }

    useEffect( ()=> {
        fetch("https://"+region2+".api.riotgames.com/lol/match/v5/matches/"+matchid+"?api_key=RGAPI-81799cc3-1374-4dc5-ad8c-fb7d59f29b4d")
        .then(res => res.json())
        .then(jsonres =>{
            console.log(jsonres.info);
            setGameInfo(jsonres.info);
            setTeamInfo(jsonres.info.teams);
            setParticipants(jsonres.info.participants);
            setFirstTeam(jsonres.info.teams[0].bans);
            setFirstTeamKills(jsonres.info.teams[0].objectives.champion.kills);
            setSecondTeam(jsonres.info.teams[1].bans);
            setSecondTeamKills(jsonres.info.teams[1].objectives.champion.kills);
        })
        .catch(err => console.log(err));
    },[]);

    //console.log(champions[0]["key"]);

    //function getChampName(id){
    //    for(var i in champions){
    //        if(champions[i]["keys"] === id){
    //            return (champions[i]["name"]);
    //        }
    //    }
    //}
    

    return(
        <div>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
                <div>
                <h2>Team1 </h2>
                    {teamInfo.filter(info => info.teamId === 100).map(infoTeam => (
                    <h3 style={infoTeam.win ? {color:"blue"}: {color:"red"}}>{infoTeam.win ? "Win" : "Loss"}</h3>
                ))}
                <p>{firstTeamKills} kills</p>
                <div style={{display:"flex", justifyContent:"center"}}>
                    {firstTeam.map((ban) => 
                        <p style={{marginLeft:"5px"}}>{ban.championId} </p>
                    )}
                </div>
                <hr/>
                {participants.filter(participant => participant.teamId === 100).map(filteredParticipant => (
                    <p>
                        
                        Summoner Name: <Link to={"/"+region+"/"+filteredParticipant.summonerName}>{filteredParticipant.summonerName}</Link>
                        <p/>
                        {filteredParticipant.lane}: {filteredParticipant.championName}
                        <hr/>
                    </p>
                ))}
                </div>
                <div>
                <h2>Team2 </h2>
                {teamInfo.filter(info => info.teamId === 200).map(infoTeam => (
                    <h3 style={infoTeam.win ? {color:"blue"}: {color:"red"}}>{infoTeam.win ? "Win" : "Loss"}</h3>
                ))}
                <p>{secondTeamKills} kills</p>
                <div style={{display:"flex", justifyContent:"center"}}>
                    {secondTeam.map((bann, i) => 
                        <p style={{marginLeft:"5px"}}>{bann.championId}</p>
                    )}
                </div>
                <hr/>
                {participants.filter(participant => participant.teamId === 200).map(filteredParticipant => (
                    <p>
                    Summoner Name: <Link to={"/"+region+"/"+filteredParticipant.summonerName}>{filteredParticipant.summonerName}</Link>
                    <p/>
                    {filteredParticipant.lane}: {filteredParticipant.championName}
                    <hr/>
                </p>
                ))}
                </div>
            </div>
        </div>
    )
}
export default MatchDisplay;