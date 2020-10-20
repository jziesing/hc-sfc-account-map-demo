import React from 'react';

let ajax = require('superagent');


class NewExtData extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            isLoading: true,
            accounts:  [],
            name: '',
            ext_data_val: '',
            related_account: '',
            errormsg: '',
            successmsg: ''
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

    componentWillMount() {
        this.setState({
            isLoading: true
        });
        let fetchAccountsURL = '/fetch/accounts/';
        ajax.get(fetchAccountsURL)
        	.end((error, response) => {
          		if(!error && response) {
                    console.log(JSON.parse(response.text));

                    let accs = JSON.parse(response.text);
	              	this.setState({
                        isLoading: false,
	                	accounts: accs
	            	});
          		} else {
              		console.log(`Error fetching data`, error);
          		}
        	});
  	}

	handleFormChange(event) {
		console.log(this.state);
        switch(event.target.id) {
            case 'ext_data_val':
                this.setState({ext_data_val: event.target.value});
                break;
            case 'extdatain':
                console.log('safeee haven' );
                console.log(this.state.related_account );
                console.log(event.target.value );
                this.setState({related_account: event.target.value});
                break;
        }
	}
	validateForm() {
        var retFlag = true;
		if(this.state.ext_data_val.length < 2) {
			this.setState({errormsg: this.state.errormsg + 'Please add external data.'});
			retFlag = false;
		}

        console.log('this.state.related_account.length' );
        console.log(this.state.related_account );
        if(this.state.related_account.length < 2) {
            this.setState({errormsg: this.state.errormsg + '  Please select an account to relate this data to.'});
			retFlag = false;
		}
        return retFlag;
	}
	handleFormSubmit(event) {
        event.preventDefault();
		this.setState({isLoading: true});
		if(this.validateForm()) {
			let contactEndUrl = '/new/extdata/';
			ajax.post(contactEndUrl)
				.set({ 'Content-Type': 'application/json' })
				.send({account: this.state.related_account, data_val: this.state.ext_data_val})
				.end((error, response) => {
                    this.setState({isLoading: false});
                    if(!error && response.status == 200) {
                        console.log('success');
                        console.log(response);
						this.setState({
                            isLoading: false,
                            name: '',
							successmsg: 'Success! Data added.',
                            ext_data_val: '',
                            related_account: '',
                            errormsg: ''
						});
                    } else {
                        console.log('fail');
                        console.log(error);
                        this.setState({
                            isLoading: false,
                            name: '',
							successmsg: '',
                            errormsg: 'something went wrong, please try again.'
						})
                    }
                });
		} else {
			this.setState({isLoading: false});
		}
	}
    msgMarkup() {
        if(this.state.errormsg != '') {
            return (
                <div class="alert alert-danger" role="alert">
                    { this.state.errormsg }
                </div>
            );
        } else if(this.state.successmsg != '') {
            return (
                <div class="alert alert-success" role="alert">
                    { this.state.successmsg }
                </div>
            );
        }
    }
    accLiMarkup()  {
        if(this.state.accounts.length > 0) {
            return this.state.accounts.map((acc, index) => {
                if(acc.sfid == this.state.related_account) {
                    return (
                        <option key={index} value={acc.sfid} selected>{acc.name}</option>
                    )
                } else {
                    return (
                        <option key={index} value={acc.sfid}>{acc.name}</option>
                    );
                }
            });
        }
    }
	markup() {
		if(this.state.isLoading) {
			return (
				<form class="form-horizontal" action="">
					<div class="col-sm-offset-4 col-sm-4">
						<i class="fa fa-spinner fa-spin loadingCon" />
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<button type="submit" class="btn btn-cSend disabled">Send</button>
						</div>
					</div>
				</form>
			);
		} else {
			return (
				<form class="form-horizontal" action="" onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                        <label for="message" class="col-sm-2 control-label">Related Account</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="extdatain" onChange={this.handleFormChange} >
                                <option>Please Select One</option>
                                { this.accLiMarkup() }
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="message" class="col-sm-2 control-label">External Data Item</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="ext_data_val" placeholder="text" onChange={this.handleFormChange} value={this.state.ext_data_val} />
                        </div>
                    </div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<button type="submit" class="btn btn-cSend">Send</button>
						</div>
					</div>
				</form>
			);
		}
	}

	render() {


		return (
			<div>
				<div class="row">
	                <div class="text-center">
	                    <h1>Add a new external data</h1>
	                </div>
		    	</div>
                { this.msgMarkup() }
				{ this.markup() }
			</div>
		);
	}
}

export default NewExtData;
