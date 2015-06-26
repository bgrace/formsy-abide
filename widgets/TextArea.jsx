import React from 'react';
import Formsy from 'formsy-react';
import FieldWarning from './FieldWarning';
import Widget from './Widget'

var TextArea = React.createClass({

    mixins: [Widget, Formsy.Mixin],

    render: function () {
        var required = this.props.required ? <small>required</small> : "";
        var placeholder = this.props.placeholder ? this.props.placeholder : this.props.label;

        return (
            <div className={this.errorClass()}>
                <label>
                    <strong>{this.validityCheck()} { this.props.label }</strong> { required }
                    <textarea
                        placeholder={ placeholder }
                        name={this.name}
                        required={ this.props.required }
                        onBlur={this.blurred}
                        onChange={this.valueChanged}
                        value={this.getValue()}
                        {...this.props.attrs}
                        disabled={this.isFormDisabled()}>
                    </textarea>
                </label>
                <FieldWarning warning={this.getErrorMessage()} />
            </div>
        );
    }
});

module.exports = TextArea;