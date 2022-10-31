import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';




class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2022 Lhqbao.</p>
                <div className='social'>
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-youtube"></i>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fire changeLanguageApp action
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
