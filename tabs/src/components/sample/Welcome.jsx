import React, {useEffect, useState} from "react";
import "./Welcome.css";
import {useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTeamsFx } from "./lib/useTeamsFx";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { useData } from "./lib/useData";
import { Graph } from "./Graph";
import axios from "axios";

const team = [{name: 'John', image: 'https://picsum.photos/200'}, {name: 'Jane', image: 'https://picsum.photos/200'}, {name: 'Jack', image: 'https://picsum.photos/200'}, {name: 'Jill', image: 'https://picsum.photos/200'}, {name: 'Jenny', image: 'https://picsum.photos/200'}, {name: 'John', image: 'https://picsum.photos/200'}, {name: 'Jane', image: 'https://picsum.photos/200'}, {name: 'Jack', image: 'https://picsum.photos/200'}, {name: 'Jill', image: 'https://picsum.photos/200'}, {name: 'Jenny', image: 'https://picsum.photos/200'}, {name:'Sam' , image: 'https://picsum.photos/200'}, {name:'Peter', image: 'https://picsum.photos/200'}];
const teamFinal= [];
const user = {email : 'abc@gmail.com' , voting : 'true', endTime: new Date(), startTime: new Date()};
const urlUser='';
const urlTeam='';
let question = "What participant was the most convincing regarding his/her problem-solving skills?";
const urlQuestion='';
export function Welcome(props) {

    
    const { isInTeams } = useTeamsFx();
    const userProfile = useData(async () => {
        const credential = new TeamsUserCredential();
        return isInTeams ? await credential.getUserInfo() : undefined;
    })?.data;
    const userName = userProfile ? userProfile.displayName : "";
    user.email =userName;



    const history = useHistory();
    const [votingAvail, setVotingAvail] = useState(user.voting);
    const [clicked , setClicked] = useState(false);
    const [votedFor, setVotedFor] = useState('');   
    useEffect(() => {
        console.log(votedFor);
        // axios.get(urlUser).then(response => {
        //     user.email= response.data.email;
        //     user.voting = response.data.voting;
        //     user.endtime = response.data.endtime;
        //     setVotingAvail(response.data.voting);
        // });
        // axios.post(urlTeam).then(response => {
        //     teamFinal.push(response.data);
        // });
        // axios.get(urlQuestion).then(response => {
        //     question = response.data.question;
        // });
    },[]);
  useEffect(() => {
      if(user.voting !== 'true'){
        history.push('/privacy');
      }
    //   if(user.endTime < new Date() || user.startTime > new Date()){
    //         history.push('/privacy');
    //   }
      

      // eslint-disable-next-line 
  }, [user]);

  useEffect(() => {
      console.log("Inside special use effect");
    console.log(votedFor);
  }, [votedFor]);
    const handleMemberClick = (e, name) => {
        e.preventDefault();
        if(clicked){
            //history.push('/privacy');
            return;
        }
        setClicked(true);
        setVotedFor(name);
        const obj  = {email : user.email, votedFor:name , voting : 'false'};
        console.log(obj);
        console.log(votedFor);
        setVotingAvail('false');
        //history.push('/privacy');
    }

    const handleSkipClick = (e) => {
        e.preventDefault();
        const obj= {email : user.email, votedFor:'' , voting : 'false'};
        console.log(obj);
        setVotingAvail('false');
        history.push('/privacy');
    }

  return (
    <div className="container-fluid" style={{ backgroundImage: 'radial-gradient(circle, rgba(246,67,70,1) 0%, rgba(251,33,120,1) 100%, rgba(0,212,255,1) 100%)', height:'100%', color:'white'}}>
        <div className="row">
            <div className="col"><img src="logo.png" alt="logo" width="200px" style={{marginLeft: '0px'}}/></div>
            <div className="col col-sm-2 col-md-2" style={{padding: '1%'}}>{userProfile?<div className="alert alert-success signIn">Signed In as <b>{userName}</b></div>:<Graph />}</div>
        </div>
        <div className="row question">
            <div className="col">
                <h1 style={{textAlign: 'center'}}>{question}</h1>
            </div>
        </div>
        <div className="row" style={{paddingTop: '3%'}}>
            <div className="col" style={{marginRight: '30%', marginLeft: '30%', border: 'dashed'}}>
                <h4 className="text-center">Use this opporutnity to show your appreciation</h4>
            </div>
        </div>
        <div className="row people" style={{margin: '2%',paddingTop: '1%'}}>
        {team.map((member) =>(
                      <div className={clicked ? "col-12 col-lg-3 col-md-4 col-sm-6 nocustom-card":"col-12 col-lg-3 col-md-4 col-sm-6 custom-card" } onClick={(e)=>handleMemberClick(e,member.name)}>
                          <div className="box">
                            <div className={clicked && member.name===votedFor ? "voted-box-inner box-inner":"box-inner"}>
                                <img className={clicked && member.name===votedFor?"rounded-circle team voted-image":"rounded-circle team"} src={`${member.image}`} alt="memeber" />
                                <h3 className={clicked && member.name===votedFor? "name voted-text":"name"}>{member.name}</h3>
                              </div>
                          </div>
                          <div className={clicked && member.name===votedFor ? "voted":"vote"}>
                            <h3 className={clicked ? "notext" : "text"}>{!clicked?"Vote Now":null}</h3>
                            <img src="https://cdn.iconscout.com/icon/free/png-256/checkmark-1767470-1502540.png" className={clicked && member.name===votedFor ? "image" :"noimage"} width="15%" alt="checkmark"/>
                        </div>
                      </div>)
        )}    
        </div>
        <div className="row" style={{paddingTop: '0.8%'}}>
            <div className="col">
                <p className="skip" onClick={(e)=>handleSkipClick(e)}>Skip for now</p>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p className="end-text">Your name and result will not be puclished. Your feedback is 100% anonymous.</p>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p className="end-text-2">The voting ends 20 minutes after the Meeting.</p>
            </div>
        </div>
    </div>
  );
}
