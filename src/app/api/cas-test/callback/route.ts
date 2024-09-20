import { NextResponse } from 'next/server';
const CASAuthentication = require('node-cas-client');

const cas = new CASAuthentication({
  cas_url: 'https://school-cas-server.edu/cas', // The CAS server's base URL
  service_url: 'http://localhost:3000/api/cas/callback', // This is the current file's route
  cas_version: '3.0',
});

export async function GET(request: NextResponse) {
  return new Promise((resolve) => {
    const req = request; // Incoming request to the callback
    const res = {
      writeHead: (status: any, headers: any) => {
        console.log(status);
        resolve(NextResponse.redirect(headers.Location)); // Redirect user based on response
      },
      end: () => resolve(NextResponse.next()),
    };

    cas.handle(req, res, () => {
      // At this point, the user has been authenticated by CAS.
      // You can now store user information in a session or cookie.
      resolve(NextResponse.redirect('/protected')); // Redirect to a protected page after login
    });
  });
}
