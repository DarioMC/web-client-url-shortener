import React, { Component } from 'react';


class Top extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            tops: []
        };
    }
    
    componentDidMount() {        
        fetch('https://urlshortened.herokuapp.com/top.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => { return response.json(); })
            .then((data) => {
                this.setState({ tops: data['data'] });
            })
    }
    
    render() {
        if(this.props.print_top){
            if(this.state.tops.length > 0) {
                const urls = this.state.tops.map((url, i) => {
                    return (
                        <section className="tiles" key={ url['id'] }>
                            <article className="style1">
                                <a href={ url['short_url'] }>
                                    <h4>{ url['title'] }</h4>
                                </a>
                                <div className="content">
                                    
                                    <p>Original Url: { url['original_url'] }</p>
                                    <p>Short Url: { url['short_url'] }</p>
                                    <p>Visit Count: { url['visit_count'] }</p>
                                </div>
                            </article>
                        </section>
                    )
                });

                return (
                    <div id="main">
                        <div className="Top">
                            <div className="inner">
                                
                                <header>
                                <center>
                                    <br/>
                                    <p>
                                    <h1>Top 100 Shortened URLs Most Visited<br />
                                    </h1>
                                    </p>
                                    <br/>
                                    </center>
                                    <br /> 
                                </header>
                                
                                { urls }
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <p className="text-center">Loding...</p>
                )
            }
        } else {
            return(
                <p className="text-center"></p>
            )
        }
    }   
}

export default Top;