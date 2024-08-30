import React, { Component } from "react";

class Sidebar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="w-full">
                <h2 className="text-2xl font-archivo font-bold text-center text-secondary">MovieFinder</h2>
              
                <div className="sideMenu 10/12 mx-auto">
                    <div className="w-full p-2 text-xs"><i className="fas fa-home"></i>  Home</div>
                    <div className="w-full p-2">History</div>
                </div>
            </div>
        )
    }
}

export default Sidebar;