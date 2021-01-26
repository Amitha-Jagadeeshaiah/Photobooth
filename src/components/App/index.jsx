import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import CapturePhoto from '../CapturePhoto';
import CreateGIF from '../CreateGIF';
import SendText from '../SendText';
import SignUp from '../SignUp';

export default function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path = '/' component = { HomePage } exact />
                <Route path = '/photo' component = { CapturePhoto } exact />
                <Route path = '/gif' component = { CreateGIF } exact />
                <Route path = '/sendText' component = { SendText } exact />
                <Route path = '/signUp' component = { SignUp } exact />
            </Switch>
        </BrowserRouter>
    );

}
