import React from 'react';

export default class SubmitButton extends React.Component {

    constructor() {

        super();

        this.buttonStates = {
            invalid: function () {
                return this.disabledButton("Please complete the form to continue.");
            }.bind(this),
            invalidSubmitted: function () {
                return this.disabledButton("Please fix any errors to continue.");
            }.bind(this),
            valid: function () {
                return this.enabledButton(this.props.callToAction);
            }.bind(this),
            processing: function () {
                return this.enabledButton("Sending...", "fa-spinner fa-pulse", false);
            }.bind(this),
            accepted: function () {
                return this.enabledButton("Thank You", "fa-check-square-o", false);
            }.bind(this),
            illegal: function() {
                return <div>An error occurred. Please reload the page and try again.</div>
            }.bind(this),
            error: function() {
                return <div>A server error occurred. Please reload the page and try again.</div>
            }.bind(this)
        };

        this.enabledClasses = "right box-shadow";
        this.disabledClasses = "disabled right box-shadow";

    }

    disabledButton(explanation) {
        let classes;
        if (this.props.extraClasses) {
            classes = this.disabledClasses + ' ' + this.props.extraClasses;
        } else {
            classes = this.disabledClasses;
        }

        return (
            <div>
                <small className={"left"}>{explanation}</small>
                <div><button type="button" disabled className={classes}>{this.props.callToAction}</button></div>
            </div>);
    }

    enabledButton(text, icon=null, canSubmit=true) {
        var className = icon ? `fa ${icon}` : "";
        var buttonType = canSubmit ? "submit" : "button";

        let classes;
        if (this.props.extraClasses) {
            classes = this.enabledClasses + ' ' + this.props.extraClasses;
        } else {
            classes = this.enabledClasses;
        }

        return (
            <div>
                <small className={"left"} style={{visibility: "hidden"}}>The form is valid.</small>
                <button type={buttonType} className={classes}><i className={className}></i> {text} </button>
            </div>
        );
    }

    render() {
        var method = this.buttonStates[this.props.formState.name];
        return method();
    }
}