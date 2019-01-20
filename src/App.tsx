import * as React from 'react';
import './App.css';

import logo from './logo.svg';


interface IApp {
  containers: string,
  responseTaurangeHTML: string,
  lyttletonNumber: string,
  showmeLyttleton: string,
  storeKiwirailValue: string,
  KiwirailNumber: string,
  kiwRailResponce: string,
  showmekiwirail: string,
  showmeOtago: string,
  otagoNumber: string,
  timaruNumber:string,
  showmeTimaru:string,
  timaruResponse:string,
  showmetsfResponse:string,
  StartDateValue:string,
  EndDateValue:string,
  aucklandNumber:string,
  showmeAuckland:string,
  condet_Num:string,
  showmeTauranga:string,
  
  
}

class App extends React.Component<{}, IApp> {

  constructor(props: any) {
    super(props);
    this.state = {
      containers: "",
      responseTaurangeHTML: "",
      lyttletonNumber: "",
      showmeLyttleton: "",
      storeKiwirailValue: "",
      KiwirailNumber: "",
      kiwRailResponce: "",
      showmekiwirail: "",
      showmeOtago:"",
      otagoNumber:"",
      timaruNumber:"",
      showmeTimaru:"",
      timaruResponse: "",
      showmetsfResponse:"",
      EndDateValue:"",
      StartDateValue:"",
      aucklandNumber:"",
      showmeAuckland:"",
      condet_Num:"",
      showmeTauranga:"",
    }
    this.storeContainerValue = this.storeContainerValue.bind(this);
    this.searchContainer = this.searchContainer.bind(this);
    this.searchLyttletonContainer = this.searchLyttletonContainer.bind(this)
    this.searchKiwirailContainer = this.searchKiwirailContainer.bind(this)
    this.searchOtagoContainer= this.searchOtagoContainer.bind(this)
    this.searchTimaruContainer= this.searchTimaruContainer.bind(this)
    this.searhTaurangaDetails=this.searhTaurangaDetails.bind(this)
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <form id="contform">
          <textarea
            id="containers"
            name="containers"
            onChange={this.storeContainerValue}
            value={this.state.containers}
          />
          <br />
          <button type="button" onClick={this.loopCallWeb}>click</button>
          <br />

        </form>

      </div>
    );
  }

  public storeContainerValue(e: any) {
    // this.setState({trackingNum: e.target.value});
    this.setState({ containers: e.target.value });
  }
  
  public loopCallWeb= () =>{
    this.searchContainer()
    this.searchLyttletonContainer()
    this.searchKiwirailContainer()
    this.searchOtagoContainer()
    this.searchTimaruContainer()
  }

  public searchContainer() {
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://cors-anywhere.herokuapp.com/http://www.port-tauranga.co.nz/services-facilities/container-tracking/container-tracking-results/");
    
    xhr.onload = (event: any) => {
      this.setState({ responseTaurangeHTML: event.target.response });
      // const getDetailsPosition=this.state.responseTaurangeHTML.search("return getdetails")
      // console.log(getDetailsPosition)
      // The idex number of "return getdetails is fixed"
      const getDetailsPosition=50723
      this.setState({condet_Num: this.state.responseTaurangeHTML.slice(getDetailsPosition+18,getDetailsPosition+28)})
      // console.log(this.state.condet_Num)
      this.searhTaurangaDetails()
    };
    const formData = new FormData();
    formData.append('containers', this.state.containers)
    xhr.send(formData);

    
  }

  public searhTaurangaDetails=()=>{
    const xhr = new XMLHttpRequest();
    console.log(this.state.condet_Num)
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://www.port-tauranga.co.nz/services-facilities/container-tracking/container-tracking-details/?contdet=" + this.state.condet_Num, true);
    xhr.onload = (event: any) => {
      this.setState({ showmeTauranga: event.target.response })
      // console.log(this.state.showmeTauranga.search("<table class="))
      // console.log(this.state.showmeTauranga.search("</div><!-- #main -->"))
      // const tableStart =50066
      // const tableEnd =52025
      const details =this.state.showmeTauranga.slice(50066,52025)
      const tabletojson = require('tabletojson');
      const tables = tabletojson.convert(details);
      console.log(tables)
    };
    xhr.send("");

  }

  public searchLyttletonContainer() {
    const xhr = new XMLHttpRequest();
    const trumpylyttleton = this.state.containers
  
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://www.lpc.co.nz/wp-content/themes/LPC/container_tracking.php?code=" + trumpylyttleton, true);
    xhr.onload = (event: any) => {

      console.log(event.target.response);
      this.setState({ showmeLyttleton: event.target.response })
    };
    xhr.send("");
  

  }
  public searchKiwirailContainer() {
    fetch("https://cors-anywhere.herokuapp.com/http://www.kiwirailfreight.co.nz/umbraco/webservices/Track.asmx/gl", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: "{wc:'" + this.state.containers + "'}"
    })
      .then(res => res.json())
      .then(
        (kiwirailresponse) => {
          console.log(kiwirailresponse)
          this.setState({ showmekiwirail: kiwirailresponse.d })
        },

        (error) => {
          this.setState({

          });
        }
      )
  }

  public searchOtagoContainer() {
    const xhr = new XMLHttpRequest();
    const trumpyOtago = this.state.containers
 
    xhr.open("GET", "https://jsonp.firebrand.nz/?url=http%3A%2F%2Fwebservices.portotago.co.nz%3A30497%2Fcontainerquery%2FDefault.aspx%3Fid%3D" + trumpyOtago, true);
    xhr.onload = (event: any) => {

      console.log(JSON.parse(event.target.response));
      this.setState({ showmeOtago: event.target.response })
    };
    xhr.send("")

  }
  public searchTimaruContainer(){
    fetch("https://cors-anywhere.herokuapp.com/http://www.timarucontainerterminal.co.nz/umbraco/Surface/SparcService/LookupContainers", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: "{containerIds:'" + this.state.containers + "'}"
    })
      .then(res => res.json())
      .then(

        (timaruResponse) => {
          console.log(timaruResponse)
          this.setState({ showmeTimaru: timaruResponse})
        },
        (error) => {
          this.setState({

          });
        }
      )

  }
}

export default App;
