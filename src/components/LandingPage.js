import React from 'react';
import { Image } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './landing.css';

function LandingPage() {
  return (
    <div>
      <h1 className="no-scroll" style={{color: 'goldenrod'}}>
        <div>
         
          <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <h1 style={{color: 'goldenrod'}}>Hi my name is Ender </h1>
            <h1 style={{color: 'goldenrod'}}>Welcome to my Blog</h1>
            <h1 style={{color: 'goldenrod'}}>You can read my posts here
              <a href={'/home'} style={{textDecoration: "none"}}>
                <h1 style={{color: 'darkgreen'}}>Home</h1>
              </a>
            </h1>
            <h1 style={{color: 'goldenrod'}}>These are my other projects</h1>
            <ul>
              <li>
                <a href="https://master.d2jfuckny8hv4x.amplifyapp.com/jobs" target="_blank" style={{textDecoration: "none"}}>
                  <h3 style={{color:"red"}}>
                    JobsTracker
                  </h3>
                </a>
              </li>
              <li>
                <a href='https://master.d1r4igw92m7rsg.amplifyapp.com/' target="_blank" style={{textDecoration: "none"}}>
                  <h3 style={{color:"red"}}>
                    Movies and Shows APP
                  </h3>
                </a>
              </li>
              <li>
                <a href='https://github.com/enderta/TestingProject.git' target="_blank" style={{textDecoration: "none"}}>
                  <h3 style={{color:"red"}}>
                    Testing Project for JobsTracker App
                  </h3>
                </a>
              </li>
            </ul>
            <div style={{display: "flex", justifyContent: "center"}}>
              <a href="https://github.com/enderta"  target='blank' style={{marginRight: "20px"}}>
                <FaGithub size={40} color="white" />
              </a>
              <a href="https://www.linkedin.com/in/endertanriverdi/" target='blank'>
                <FaLinkedin size={40} color="white" />
              </a>
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
}

export default LandingPage;