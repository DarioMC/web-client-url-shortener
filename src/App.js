import React, { Component } from 'react';
import './App.css';
import Top from './components/Top.js'
import Create from './components/Create.js'
//import validate from './components/FormValidationRules';


class App extends Component{

    
    constructor() {
        super();
        
        this.state = {   
              
            print_top: false,
            print_create: false,
            url: '',
            errors: { }
        };
        
        this.handleShow = this.handleShow.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleUpdate= this.handleUpdate.bind(this);
        this.handleHelp= this.handleHelp.bind(this);
        
    }

    handleUpdate(e) {
        if(this.handleUpdate){
                this.setState({ print_create: true })
                //window.location.reload()
            }

        }
    
    handleHelp(e) {
        if(this.handleHelp){
            alert('1:Enter a valid URL, 2: Press Shorter, 3: Press Update, 4:Press Shorter again')
            }
            e.preventDefault();

        }
    
    handleShow(e) {
        e.preventDefault();
        this.setState({ print_top: true})
        this.setState({ print_create: true })
        
        if( this.handleInput === true) {
            this.setState({ print_create: false })
            window.location.reload()
        }


    }
    
    handleCreate(e) {

        var res = this.state.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g);
        if(res == null){
            alert('Invalid Format')
            //window.location.reload()
        }
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
    
    handleInput(e){
    this.setState(
        { url: e.target.value }
        );
            
    }
    
    render() {
        return (
            // begin body view react
            <div className="App">

                <header className="header" id="header">   
                    <br /> 
                                 
                    <h1 className="bg-info text-white"> &nbsp; Shortener Url</h1>
                </header>

                <center>
                <form id="signup-form">
                <div className="refresh">
                    <input className="btn btn-info" 
                    type="submit" 
                    value="Update" 
                    onClick={this.handleUpdate}/>
                    </div>
                    <div className="help">
                    <input className="btn btn-info" 
                    type="submit" 
                    value="Help" 
                    onClick={this.handleHelp}/>
                    </div>

                </form>
                <form id="signup-form" method="post" >
                    <br /> 
                    <div className="img-url">   
                    <img className="card-img-top" src="https://cdn.iconscout.com/icon/free/png-256/url-9-437256.png"/> 
                    
                    </div>

                    
                    <div className="form-url">

                        <input className="form-control"   
                            type="url" 
                            name="url" 
                            id="url" 
                            placeholder="Enter your URL"
                            value={this.state.url} 
                            onChange={ this.handleInput}/>
                            </div>
                            
                    <br />
                    <br />
                    <input className="btn btn-info" 
                            type="submit" 
                            value="Shorter" 
                            onClick={ this.handleCreate }/>
                    &nbsp; &nbsp;
                    <input className="btn btn-info" 
                            type="submit" 
                            value="TOP 100 ULRs" 
                            onClick={ this.handleShow }/>
                    <br />
                    <br />
                </form>
                </center>
                <p>_____________________________________________________________________________________________________________________________________________________________________________________</p>
                
                <Top print_top={ this.state.print_top }/>
                <Create print_create={ this.state.print_create } />

                <footer>
                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
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

