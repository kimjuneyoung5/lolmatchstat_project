import axios from 'axios';
import React from 'react';
import {useEffect, useState} from 'react';
import { useParams, Link} from 'react-router-dom';


const CurrentGameDisplay = (props) => {
    const {region, summonerId} = useParams();
    const [gameInfo, setGameInfo] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [displayErr, setDisplayErr] = useState("");

    useEffect( () => {
        axios.get("https://"+region+".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+summonerId+"?api_key=RGAPI-81799cc3-1374-4dc5-ad8c-fb7d59f29b4d")
            .then(res => {
                console.log(res.data);
                setGameInfo(res.data);
                setParticipants(res.data.participants);
            })
            .catch(err => {
                console.log(err);
                setDisplayErr("User is not in game");
            })           
    },[summonerId]);

    return (
        <div>
            {displayErr ? 
                <div style={{textAlign:"center"}}>
                    <h1>{displayErr}</h1>
                </div>
                :
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                    <div>
                        <h2>Team1 </h2>
                        {participants.filter(participant => participant.teamId === 100).map(filteredParticipant => (
                        <p>
                            Summoner Name: <Link to={"/"+region+"/"+filteredParticipant.summonerName}>{filteredParticipant.summonerName}</Link>
                        <hr/>
                        </p>
                        ))}
                    </div>
                    <div>
                        <h2>Team2 </h2>
                        {participants.filter(participant => participant.teamId === 200).map(filteredParticipant => (
                        <p>
                            Summoner Name: <Link to={"/"+region+"/"+filteredParticipant.summonerName}>{filteredParticipant.summonerName}</Link>
                        <hr/>
                        </p>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
export default CurrentGameDisplay;