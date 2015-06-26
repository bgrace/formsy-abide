import React from 'react';

var Widget = {

    errorClass: function() {
        if (this.state.hasBlurred) {
            return (this.state.userLeftInvalid || this.showError()) ? "error" : "";
        } else {
            return false;
        }
    },

    validityCheckSuccessStyle: {color: "green", width: "1em"},
    validityCheckFailedStyle: {color: "red", width: "1em"},
    validityCheckPristineStyle: {width: "1em"},

    validityCheck: function() {
        if (this.props.required) {
            if (this.isPristine()) {
                return <i className="fa fa-square-o" style={this.validityCheckPristineStyle}> </i>

            } else if (this.isValid()) {
                return <i className="fa fa-check-square-o" style={this.validityCheckSuccessStyle}> </i>
            } else {
                return <i className="fa fa-square-o" style={this.validityCheckFailedStyle}> </i>
            }
        } else {
            return false;
            //return <i className="fa fa-square-o" style={this.validityCheckOptionalStyle}> </i>;
        }
    },

    valueChanged: function(event) {
        this.setValue(event.currentTarget.value);
        this.setState({userLeftInvalid: false});
    },

    blurred: function(event) {
        this.setState({userLeftInvalid: !this.isValid(), hasBlurred: true});
    },

    componentDidMount: function() {
        this.required = this.props.required ? <small> required</small> : "";
        this.placeholder = this.props.placeholder ? this.props.placeholder : this.props.label;
    },

    getInitialState: function() {
        return {userLeftInvalid: false};
    }
};

export default Widget;