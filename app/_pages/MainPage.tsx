'use client';
import * as React from 'react';
import { Cover } from '../_components/Cover';
import { BackgroundWrapper } from '../_components/Background';
import { useMusicContext } from '../_context/MusicContext';

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
            {open && <div>Content to show when open is true</div>}
        </BackgroundWrapper>
    );
};

export default MainPage;
