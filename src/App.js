import React from "react";
import { connect } from "react-redux";
import { checkUser, clearReducer } from "./redux/userReducer";
import Header from "./components/Header";
import routes from "./routes";
import "./App.css";
import {withRouter} from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.checkUser();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.userReducer.user != this.props.userReducer.user) {
      console.log('hit condition')
    if(!this.props.userReducer.user.email) this.props.history.push('/')
    }
  }

  componentWillUnmount() {
    // this.props.clearReducer()
  }

  render() {
    let loading = this.props.userReducer.loading ? "busy-cursor" : null;
    return (
      <div className={`App ${loading}`}>
        <Header />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    userReducer: reduxState.userReducer
  };
};

export default connect(mapStateToProps, { checkUser, clearReducer })(withRouter(App));
