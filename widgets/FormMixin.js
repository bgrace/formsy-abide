import React from 'react';

var FormValidationStateMachine = require("../FormValidationStateMachine");

var TextField = require('./TextField');
var RadioGroup = require('./RadioGroup');
var TextArea = require('./TextArea');
var SelectField = require('./SelectField');

var FormMixin = {

    componentDidMount: function() {
        var $component = $(React.findDOMNode(this));
        $component.attr('data-abide', true); // for styling purposes
    },

    getInitialState: function () {
        this.FSM = new FormValidationStateMachine(function(oldState, newState, production) {
            this.setState({FSMState: newState});
        }.bind(this));

        return {
            FSMState: this.FSM.state
        };
    },

    becameValid: function() {
        this.FSM.validate();
    },

    becameInvalid: function(e) {
        this.FSM.invalidate();
    },

    shouldDisableForm: function() {
        return this.state.FSMState == this.FSM.states.accepted;
    },

    fieldsForSchema: function(schema) {
        return schema.map(this.schemaToComponent);
    },

    schemaToComponent: function (schema) {

        var components = {
            "radio": function () {
                return (<RadioGroup key={schema.name} {...schema}/>);
            },
            "textarea": function () {
                return (<TextArea key={schema.name} {...schema}/>);
            },
            "select": function () {
                return (<SelectField key={schema.name} {...schema}/>);
            }
        };

        var component = components[schema.type];
        if (component) {
            return component();
        } else {
            if (!schema.warning) {
                if ("email" == schema.type) {
                    schema.validationError = "An email address like name@example.com is required.";
                    schema.validations = "isEmail";
                }
            }

            return (<TextField key={schema.name} {...schema}/>);
        }
    },

    submit: function (model, resetForm, invalidateForm) {

        if (this.state.FSMState == this.FSM.states.valid) {
            this.FSM.submit();

            var formData = JSON.stringify(this.createSubmissionData(model));
            var self = this;

            $.ajax({url: this.props.primeEndpoint,
                xhrFields: {
                    withCredentials: true
                }}).
                fail(function(data) {
                    alert("The server could not be reached. Please try again later.");
                }).
                then(function (data) {
                    return $.ajax({
                        url: self.props.config.endpoint,
                        type: "POST",
                        dataType: "json",
                        data: formData,
                        headers: {"X-CSRFToken": data.token},
                        context: self,
                        xhrFields: {
                           withCredentials: true
                        }
                    });
                }).
                done(function (data) {
                    self.FSM.accept();
                }).
                fail(function (data) {
                    if (data.status == 400 && data.responseJSON && data.responseJSON.reason == "Invalid") {
                        self.FSM.invalidate();
                        invalidateForm(data.responseJSON.errors);
                    } else {
                        self.FSM.error();
                        console.log("An unrecognizable error occurred", data);
                    }
                });
        } else if (this.state.FSMState == this.FSM.states.invalid) {
            e.preventDefault();
            console.log("Submit event when form state is", this.state.FSMState);
        } else {
            console.log("Form submitted in unexpected state, this current state is", this.state.FSMState.name);
        }
    }

};

module.exports = FormMixin;