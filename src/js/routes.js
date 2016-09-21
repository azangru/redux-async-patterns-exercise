import Layout from './layout';
import Main from '~/modules/main/Main';
import Showcase from '~/modules/showcase/Showcase';
import Login from '~/modules/login/Login';
import HashtagAutocompletionPage from '~/modules/hashtag-autocompletion-demo/DemoPage';

export default {
    component: Layout,
    path: '/',
    indexRoute: {
        component: Main
    },
    childRoutes: [
        {
            path: 'showcase',
            component: Showcase
        },
        {
            path: 'login',
            component: Login
        },
        {
            path: 'hashtag-autocompletion-with-draftjs',
            component: HashtagAutocompletionPage
        }
    ]
};
