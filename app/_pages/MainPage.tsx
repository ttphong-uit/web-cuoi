'use client';
import * as React from 'react';
import { Cover } from '../_components/Cover';
import { BackgroundWrapper } from '../_components/Background';
import { useMusicContext } from '../_context/MusicContext';
import {Section_1} from '../_components/Section_1';
import {Section_2} from '../_components/Section_2';

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handler = useMusicContext();
    return (
        <BackgroundWrapper>
            <Cover
                onClick={() => {
                    setOpen(true);
                    handler.playMusic();
                }}
                shouldShow={open === false}
            />
            {open && <>
                <Section_1 />
                <Section_2 />
            </>}
        </BackgroundWrapper>
    );
};

export default MainPage;
