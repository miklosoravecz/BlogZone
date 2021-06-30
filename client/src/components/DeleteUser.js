
import {Redirect} from "react-router-dom";
import React, { Component } from 'react';
import { getCookie } from "../auth/helpers";
import {remove} from "../auth/user";
import {signout} from "../auth/helpers";


class DeleteUser extends Component {

    state= {
        redirect: false
    }

    deleteAccount = () => {
        
        const token = getCookie().token;
        const userID = this.props.userID;
       
        console.log(token);
        console.log(userID);
        remove(userID, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                //signout  
                signout(()=> console.log("user is deleted"));
                //redirect
                this.setState({redirect: true})
            }
        })
        
    };
   
    deleteConfirm = () => {
        let answer = window.confirm("Do you want to delete your profile?")
        if(answer){
            this.deleteAccount();
           
        }
    };

    render() {
       
      if(this.state.redirect) {
       return <Redirect to="/"/>
        }
     
        return (
           
            <div>
                <button onClick={this.deleteConfirm} className="mybutton">
                    Delete user
                </button>
            </div>
        );
    }
}

export default DeleteUser;