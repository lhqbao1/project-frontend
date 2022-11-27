import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Facility from './Section/Facility';
import Doctor from './Section/Doctor';
import Handbook from './Section/Handbook';
import HomeFooter from './HomeFooter';
import Video from './Section/Video';
import HomeBanner from './HomeBanner';

class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <HomeBanner />
                <Specialty />
                <Facility />
                <Doctor />
                <Handbook />
                <Video />
                <HomeFooter />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
