import React, { Component } from 'react';
import './App.css';

import Top from './components/Top.js'
import Create from './components/Create.js'


class App extends Component{
    constructor() {
        super();
        this.state = { 
            print_top: false,
            print_create: false,
            url: ''
        };
        
        this.handleShow = this.handleShow.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    handleShow(e) {
        e.preventDefault();
        this.setState({ print_top: true})
        
        if(this.state.print_create === true) {
            this.setState({ print_create: false })
            window.location.reload()
        }
    }
    
    handleCreate(e) {
        e.preventDefault();
        this.setState({ print_create: true })
        
        var data = { "original_url": this.state.url }
        
        fetch('https://urlshortened.herokuapp.com//urls/create.json', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({ new_url: data['data'] });
            });
        
        if(this.state.print_top === true) {
            this.setState({ print_top: false})
            window.location.reload()
        }
    }
    
    handleInput(e) {
        this.setState({ url: e.target.value })
    }
    
    render() {
        return (
            // begin body view react
            <div className="App">

                <header className="header" id="header">   
                    <br /> 
                                 
                    <h1 class="bg-info text-white"> &nbsp; Shortener Url</h1>
                </header>

                <center>
                <form id="signup-form" method="post" action="#">
                    <br /> 
                    <div className="img-url">   
                    <img class="card-img-top" src="https://cdn.iconscout.com/icon/free/png-256/url-9-437256.png"/> 
                    
                    </div>


                    <div className="form-url">
                    <input className="form-control" type="url" name="url" id="url" placeholder="Enter your URL"  onChange={ this.handleInput }/>
                    </div>
                    <div className="refresh">
                    <input className="btn btn-info" type="submit" value="Refresh" onclick="location.href='http://localhost:3000/"/>
                    </div>
                    <br />
                    <br />
                    <input className="btn btn-info" type="submit" value="Shorted" onClick={ this.handleCreate }/>
                    &nbsp; &nbsp;
                    <input className="btn btn-info" type="submit" value="TOP 100 ULRs" onClick={ this.handleShow }/>
                    <br />
                    <br />
                </form>
                </center>
                <p>_____________________________________________________________________________________________________________________________________________________________________________________</p>

                <Top print_top={ this.state.print_top }/>
                <Create print_create={ this.state.print_create } />

                <footer>
                <br /> <br /> <br /> <br /> <br /> <br />  <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                        <div className="footer">
                        <br />
                        <br />
                        <p className="m-0 text-center text-white">Copyright &copy; Dario Monestel C. 2019</p>
                        </div>

                </footer>

                
            </div>
            // end body view react
        );
    }
}

export default App;
//
