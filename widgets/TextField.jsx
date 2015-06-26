import React from 'react';
import Formsy from 'formsy-react';
import FieldWarning from './FieldWarning';
import Widget from './Widget'

var TextField = React.createClass({

    mixins: [Widget, Formsy.Mixin],

    render: function () {

        return (
            <div className={this.errorClass()}>
                <label>
                    <strong>{this.validityCheck()} { this.props.label }</strong>
                { this.required }
                    <input type={ this.props.type }
                           placeholder={ this.placeholder }
                           required={ this.props.required }
                           onChange={this.valueChanged}
                           value={this.getValue()}
                           name={this.name}
                           onBlur={this.blurred}
                           disabled={this.isFormDisabled()}
                        />
                </label>
                <FieldWarning warning={this.getErrorMessage()} />
            </div>
        );
    }
});

module.exports = TextField;