module.exports = function(callback) {
    this.callback = callback;

    var State = function (name) {
        this.name = name;
    };

    var Production = function(name) {
        this.name = name;
        this.p = [];

        if (arguments.length > 1) {
            this.p = Array.prototype.slice.call(arguments, 1);
        }

        this.produce = function(state) {
            for (var i = 0; i < this.p.length; i++) {
                var rule = this.p[i],
                    start = rule[0],
                    end = rule[1];
                if (start == state) {
                    return end;
                }
            }

            return states.illegal;
        };
    };

    this.states = {
        illegal: new State("illegal"), // bad transition
        invalid: new State("invalid"),
        invalidSubmitted: new State("invalidSubmitted"),
        valid: new State("valid"),
        processing: new State("processing"),
        accepted: new State("accepted"),
        error: new State("error") // submit failed
    };
    var states = this.states;

    this.productions = {
        validate: new Production("validate",
            [states.invalid, states.valid],
            [states.invalidSubmitted, states.valid],
            [states.valid, states.valid],
            [states.processing, states.processing]),
        invalidate: new Production("invalidate",
            [states.invalid, states.invalid],
            [states.invalidSubmitted, states.invalid],
            [states.valid, states.invalid],
            [states.processing, states.invalidSubmitted]),
        submit: new Production("submit", [states.valid, states.processing]),
        accept: new Production("accept", [states.processing, states.accepted]),
        error: new Production("error", [states.processing, states.error])
    };

    this.state = this.states.invalid;

    this.produce = function(oldState, production) {
        return production.transition(oldState);
    };

    this.transition = function(production) {
        var oldState = this.state,
            newState = production.produce(this.state);

        this.state = newState;
        if (this.callback) {
            callback(oldState, newState, production);
        }
        return this;
    };

    this.invalidate = function() { return this.transition(this.productions.invalidate);};
    this.validate = function() { return this.transition(this.productions.validate);};
    this.submit = function() { return this.transition(this.productions.submit);};
    this.accept = function() { return this.transition(this.productions.accept);};
    this.error = function() { return this.transition(this.productions.error);};
}

