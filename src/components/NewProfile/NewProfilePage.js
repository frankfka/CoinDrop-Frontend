import React, {Component} from 'react';
import NewProfileForm from "./NewProfileForm";

class NewProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null
        }
    }

    render() {
        return (
            <div>
                <h1>New Profile</h1>
                <NewProfileForm allCurrencies={['BTC', 'XRP', 'ETH','XLM', 'LINK', 'XMR','BAT', 'ETC', 'BSV','BCH']}/>
            </div>
        )
    }
}

export default NewProfilePage;