import React, { Component } from 'react';
import './App.css';
//import Validate from "react-validate-form"
import Top from './components/Top.js'
import Create from './components/Create.js'
//import P from './components/P.js'
//import useForm from "./components/useForm";
import validate from './components/FormValidationRules';

//import Form from './components/Form.js';


const validate_url = values => {
    const errors = {}
    console.log(values)

    /*if(!this.state.url.includes("http://")){

        errors.url = 'Enter your URL'
    }
    return errors
    */
        
    
    if (!values.url){

        errors.url = 'Enter your URL'
    }
    return errors
    

}  

/*const initialState = {


    

    url_error: ""


}*/




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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleShow(e) {
        e.preventDefault();
        this.setState({ print_top: true})
        
        if( this.handleInput === true) {
            this.setState({ print_create: false })
            window.location.reload()
        }


    }
    
    handleCreate(e) {

        var res = this.state.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null){
            alert('Insert URL')
            //window.location.reload()
        }
        
        /*
        if(!this.state.url){
            alert('Insert URL')
            window.location.reload()
                                    
        }else if (!this.state.url.includes('http://','https://')){
            alert('Invalid format')
            window.location.reload()
        }*/
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
    
    /*handleInput(e) {

        this.setState(
            { url: e.target.value }
            );
            
            //if (this.state.ulr < 10) {
              //  alert('alerta1')
             // } <h2>{this.state.errors.url}</h2>
           
        
    }*/
    //state = {}
    handleInput(e){

        this.setState(
            { url: e.target.value }
            );
            
    }

    
   /* validate = () => {
        let url_error = "";

        if (!this.state.url.includes('http://')){

            url_error = 'Invalid URL';
        }

        if (url_error){

            this.setState({url_error});
            return false;
        }
        return true;
    }; */
        
    handleSubmit = e =>{
        e.preventDefault()
        const {errors, ...sinErrors} =this.state
        const result = validate_url(sinErrors)
        //const is_valid = this.validate();
        //console.log('prevent!!!', this.state)
        this.setState({errors: result})

        /*if(is_valid){

            console.log(this.setstate)
            //clear form
            //  this.setState(initialState);
        }*/

        //value={this.state.url} 
        if (!Object.keys(result).length){
            //return this.state({errors: result})

            console.log('good')
            e.target.reset()
        }


    }


    //{errors.url && alert(this.state.errors.url)}
    
    render() {
       //console.log(this.state)
       //<p {...this.props} className="App-intro" />
       const {errors} = this.state
        return (
            // begin body view react
            <div className="App">

                <header className="header" id="header">   
                    <br /> 
                                 
                    <h1 className="bg-info text-white"> &nbsp; Shortener Url</h1>
                </header>

                <center>
                <form id="signup-form" method="post" onSubmit={this.handleSubmit}>
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
                            <div style={{fontSize: 12, color: "red"}}>  
                                {this.state.url_error}
                            </div>

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

