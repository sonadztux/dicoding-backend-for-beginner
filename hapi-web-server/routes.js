const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        }
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About Page';
        }
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        }
    },
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            const { name = "stranger" } = request.params;
            const { lang } = request.query;

            if (lang === 'id') return `Halo, ${name}!`;
            return `Hello, ${name}!`;
        }
    },
    {
        method: 'POST',
        path: '/signup',
        handler: (request, h) => {
            const { username, email } = request.payload;

            // const response = h.response(`Signup success. User ${username} with ${email} created`);
            // response.type('text/plain');
            // response.header('X-Custom', 'sndztx');
            // return response;

            return h.response(`Signup success. User ${username} with ${email} created`).type('text/plain').header('X-Custom', 'sndztx');
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload;
            return `You're successfully login with ${username} and ${password}.`;
        }
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan!';
        }
    },
];

module.exports = routes;