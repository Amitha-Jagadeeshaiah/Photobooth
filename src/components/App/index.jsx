import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import HomePage from '../HomePage';
import CapturePhoto from '../CapturePhoto';
import CreateGIF from '../CreateGIF';
import SendText from '../SendText';
import SignUp from '../SignUp';
import ImageSent from '../ImageSent';

export default function App() {

    return (
        <DeviceOrientation lockOrientation={'portrait'}>
            <Orientation orientation='portrait' alwaysRender={false}>
                <BrowserRouter>
                    <Switch>
                        <Route path = '/' component = { HomePage } exact />
                        <Route path = '/photo' component = { CapturePhoto } exact />
                        <Route path = '/gif' component = { CreateGIF } exact />
                        <Route path = '/sendText' component = { SendText } exact />
                        <Route path = '/signUp' component = { SignUp } exact />
                        <Route path = '/imageSent' component = { ImageSent } exact />
                    </Switch>
                </BrowserRouter>
            </Orientation>
        </DeviceOrientation>
    );

}
