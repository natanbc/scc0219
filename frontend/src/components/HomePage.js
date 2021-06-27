import { SignIn } from './SignIn.js';

export function HomePage() {
    return <div>
        <div className="row">
            <div className="col s6 offset-s1 flow-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit lacus sit amet metus ullamcorper, at condimentum neque sagittis. Praesent euismod tortor nisi, eu lacinia elit volutpat et. Integer interdum libero id porttitor pulvinar. Nulla vel sagittis orci. Sed dignissim ex in massa tempus, a euismod risus consectetur. Proin et massa in magna tempus commodo. Phasellus et dui luctus, tincidunt est a, facilisis nibh. Quisque vel elit ac diam vehicula aliquam sit amet sit amet nunc. Aenean vestibulum eros sit amet urna scelerisque rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus nec nibh efficitur, gravida lorem at, dignissim nisi. Vivamus nec ornare felis. Sed eu nibh volutpat, ultrices tellus a, ultricies nisl.
            </div>
            <SignIn></SignIn>
        </div>
    </div>;
}