import Layout from './layout';

// the solution for imitating System.js on the server is taken from this
// StackOverflow question: http://stackoverflow.com/questions/37121442/server-side-react-with-webpack-2-system-import
if (typeof System === 'undefined') {
    // we are on the server side
    var System = {
        import(path) {
            return Promise.resolve(require(path));
        }
    };
}

function errorLoading(err) {
    console.error('Could not load the route', err);
}

function loadRoute(cb) {
    return (module) => cb(null, module.default);
}

export default {
    component: Layout,
    path: '/',
    indexRoute: {
        getComponent(location, cb) {
            System.import('./modules/main/Main.jsx')
                .then(loadRoute(cb))
                .catch(errorLoading);
        }
    },
    childRoutes: [
        {
            path: 'showcase',
            getComponent(location, cb) {
                System.import('./modules/showcase/Showcase.jsx')
                    .then(loadRoute(cb))
                    .catch(errorLoading);
            }
        },
        {
            path: 'login',
            getComponent(location, cb) {
                System.import('./modules/login/Login.jsx')
                    .then(loadRoute(cb))
                    .catch(errorLoading);
            }
        },
        {
            path: 'hashtag-autocompletion-with-draftjs',
            getComponent(location, cb) {
                System.import('./modules/hashtag-autocompletion-demo/DemoPage.jsx')
                    .then(loadRoute(cb))
                    .catch(errorLoading);
            }
        }
    ]
};
