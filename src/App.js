import React, { Component } from "react";

import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crewPersonnel: [],
      nameFilter: "",
      officeFilter: ""
    }
    this.SetHiringStatus = this.SetHiringStatus.bind(this);
    this.FilterByName = this.FilterByName.bind(this);
    this.FilterByOffice = this.FilterByOffice.bind(this);
  }

  componentDidMount() {
    this.props.onRequestCrewPersonnel();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.crewPersonnel !== null) {
      this.setState({ crewPersonnel: newProps.crewPersonnel }, () => {
        if (window.localStorage.getItem("nameFilter") !== "") {
          this.setState({ nameFilter: window.localStorage.getItem("nameFilter") });
          this.FilterByName(window.localStorage.getItem("nameFilter"));
        }
        if (window.localStorage.getItem("officeFilter") !== "") {
          this.setState({ officeFilter: window.localStorage.getItem("officeFilter") });
          this.FilterByOffice(window.localStorage.getItem("officeFilter"));
        }
      });
    }
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  GetCrewPersonnelByHiringStatus(status) {
    return this.state.crewPersonnel.filter((crewMember) => {
      return crewMember.hiringStatus === status &&
        crewMember.filtered === false;
    });
  }

  SetHiringStatus(id, status) {
    this.setState({
      crewPersonnel: this.state.crewPersonnel.map((crewMember) => {
        if (crewMember.id.value === id) {
          return {
            ...crewMember,
            hiringStatus: status
          }
        } else {
          return crewMember;
        }
      })
    });
  }

  FilterByName(inputText) {
    window.localStorage.setItem("nameFilter", inputText);
    this.setState({
      crewPersonnel: this.state.crewPersonnel.map((crewMember) => {
        if (crewMember.name.first.indexOf(inputText) < 0) {
          return { ...crewMember, filtered: true };
        } else {
          return { ...crewMember, filtered: false };
        }
      })
    });
  }

  FilterByOffice(inputText) {
    window.localStorage.setItem("officeFilter", inputText);
    this.setState({
      crewPersonnel: this.state.crewPersonnel.map((crewMember) => {
        if (crewMember.location.city.indexOf(inputText) < 0) {
          return { ...crewMember, filtered: true };
        } else {
          return { ...crewMember, filtered: false };
        }
      })
    });
  }

  render() {
    const { crewPersonnel } = this.state;

    let applied = [];
    let interviewing = [];
    let hired = [];

    if (crewPersonnel !== null && crewPersonnel.length > 0) {
      applied = this.GetCrewPersonnelByHiringStatus("applied");
      interviewing = this.GetCrewPersonnelByHiringStatus("interviewing");
      hired = this.GetCrewPersonnelByHiringStatus("hired");

    }

    let inputNameProps = {
      className: "filter-input",
      placeholder: "Name",
      onKeyUp: (event) => {
        this.FilterByName(event.target.value)
      }
    };

    let inputOfficeProps = {
      className: "filter-input",
      placeholder: "Office",
      onKeyUp: (event) => {
        this.FilterByOffice(event.target.value)
      }
    };

    if (this.state.nameFilter !== "") {
      inputNameProps.defaultValue = this.state.nameFilter;
    }
    if (this.state.officeFilter !== "") {
      inputOfficeProps.defaultValue = this.state.officeFilter;
    }

    return (
      <div className="App" >
        {crewPersonnel &&
          <div>
            <div className="filter-title">Filter</div>
            <div className="row">
              <div className="col-md-3">
                <input {...inputNameProps}></input>
              </div>
              <div className="col-md-3">
                <input {...inputOfficeProps}></input>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="title">Applied</div>
                {applied.map((crewMember, i) =>
                  <div className="row card" key={i}>
                    <div className="image">
                      <img className="user" src={crewMember.picture.medium}></img>
                    </div>
                    <div className="name">
                      <div className="user">
                        {this.Capitalize(crewMember.name.first)} {this.Capitalize(crewMember.name.last)}
                      </div>
                      <div className="office">
                        {this.Capitalize(crewMember.location.city)}
                      </div>
                    </div>
                    <div id="move-to-interviewing" className="move-right" onClick={() => {
                      this.SetHiringStatus(crewMember.id.value, "interviewing")
                    }}>&#x21E8;</div>
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="title">Interviewing</div>
                {interviewing.map((crewMember, i) =>
                  <div className="row card" key={i}>
                    <div className="image">
                      <img className="user" src={crewMember.picture.medium}></img>
                    </div>
                    <div className="name">
                      <div className="user">
                        {this.Capitalize(crewMember.name.first)} {this.Capitalize(crewMember.name.last)}
                      </div>
                      <div className="office">
                        {this.Capitalize(crewMember.location.city)}
                      </div>
                    </div>
                    <div className="move-left" onClick={() => {
                      this.SetHiringStatus(crewMember.id.value, "applied")
                    }}>&#x21E6;</div>
                    <div className="move-right" onClick={() => {
                      this.SetHiringStatus(crewMember.id.value, "hired")
                    }}>&#x21E8;</div>
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="title">Hired</div>
                {hired.map((crewMember, i) =>
                  <div className="row card" key={i}>
                    <div className="image">
                      <img className="user" src={crewMember.picture.medium}></img>
                    </div>
                    <div className="name">
                      <div className="user">
                        {this.Capitalize(crewMember.name.first)} {this.Capitalize(crewMember.name.last)}
                      </div>
                      <div className="office">
                        {this.Capitalize(crewMember.location.city)}
                      </div>
                    </div>
                    <div className="move-left" onClick={() => {
                      this.SetHiringStatus(crewMember.id.value, "interviewing")
                    }}>&#x21E6;</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    crewPersonnel: state.crewPersonnel,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestCrewPersonnel: () => dispatch({ type: "FETCH_CREW_PERSONNEL_REQUEST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);