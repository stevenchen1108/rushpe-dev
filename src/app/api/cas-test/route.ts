// app/api/cas/login/route.js
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextResponse) {
  const url = new URL(request.url);
  const ticket = url.searchParams.get('ticket');

  if (!ticket) {
    return NextResponse.redirect(`https://cas.rutgers.edu/login?service=${encodeURIComponent('http://localhost:3000/professionalism')}`);
  }

  // Validate the ticket with the CAS server
  const validateUrl = `https://cas.rutgers.edu/serviceValidate?ticket=${ticket}&service=${encodeURIComponent('http://localhost:3000/professionalism')}`;
  
  try {
    const response = await fetch(validateUrl);
    const text = await response.text();
    
    if (text.includes('<cas:authenticationSuccess>')) {
      // Extract the username from the response
      const username: any = text.match(/<cas:user>(.*)<\/cas:user>/);

      // Set a cookie or token for session management
      const res = NextResponse.redirect('/');
      res.cookies.set('username', username, { httpOnly: true, secure: true });
      
      return res;
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CAS_SERVER}/login?service=${encodeURIComponent('http://localhost:3000/professionalism')}`);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Ticket validation failed.' }, { status: 500 });
  }
}
