import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

// API Route handler for accessing Google Calendar events
export async function GET() {
    try {
        // Initialize JWT client using environment variables
        const jwtClient = new JWT({
            email: 'rushpe-dev@rushpe-dev-calendar.iam.gserviceaccount.com',
            key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4fWZLb/JQ+YVe\n9PnUFasD4AOjojWJ1FuquNyO9Jg4/egFdaPLd+ixo4DKVIgRBA21ICYgLBDt2+aL\nqkH6UPaef8osNKPZUnCJj9rCAFzS5Mz9or2K+Fnyq5rgj2kNaxXIymLGCoWidwRs\n8OAnI9Ia9UIVUPOqHRZQ8foMBuykr/RfdMf7KYWmdqOTDzUiGGpB3pVkaWWcCz4q\nwzdcExAKOEjcMXAFmDcUYqRws8MXC7vXK/0YKR/qBPVrvdfbL4NV+/1cg1lEXDpR\njcQCoBHN/1kKDUTkNCHR1XjZ3K36vswmU8V2P3dPhjrZ2UGSDiG7/wzlaqmVAY+p\nOyTDNz23AgMBAAECggEANJAFxRhwAYIV7af+Rd6misQYRVbByjMmqs1giZpGhHZS\n1Ltfn2jac0ISP5M18SMmhKRUOHZVnG86kDBB+/91RFNEVrPoutIyHf9OZFeWGr/1\nZ44mUqHPfsRFrBUv6RLJchu3aJU23cLrD97Q/lXGVsfpvAkEY0NGSGmoxCR057Z+\nFrbNH2Lm7RXMpN/N7bszmU6CkVf19AWfLc5CgX4NRevPmQrTbayjmM0jlVltvlWP\nmmd/ih2nr8Q9DyISC6/zj8jN+HSMPdddZFA7finuNjtvHe8DKgXRsA3SJOuxJIxX\ngTo5StA8VfmZlsg0yhW+Aa3N9An2x6eIIuP6oWsIgQKBgQDfkJOnl2ajKk02FH4a\nTyKqFHSqy3jf2Zvht5DOvEGSTuVCdVXzhEu834elgIoKejgPoSKRjmostKX/Kl17\naWn/Pa5n1sZgdmemfXgiARQXKK1ROOjo/gXxaR3CzymVDRrn/qKFQMNVL5aLO3je\nnGuHane2jSAXNAWsPO1p4li5wwKBgQDTQYpspOmgPJcyVrDf2TJHBo6baIjhupk3\nVIVTITyPAdXpKNpwGqJzjQfLyrE/MmOa4bPzTa2YbSVP7geAc3/El5XJRoa5YADt\nY5UWSr2bAAFzLYVNvGCzuow/G57VJBPSa3PnS/LufRXclVufCMuDZxV9zjOcAj2z\ndVnUQDc4/QKBgQCPGJ8p+kJ71auuHdfJRzXM32L9n1czELox86kAaocd+tnLfAcT\n424G6pyMVoYExs3zUxQpTpqvGsHVXWyQfZyW/wgO9u3q+F7Hti+atE4DtMma325V\nE6MCLmIaOzdGbCj4rYeg+x8L+3XEkMCA3GYHOyJ8+j+8GlQ3NphP2c0ouQKBgQCW\nYLIjciSnnlnWSGVxgo9Khb1fnMLLQ+OqwiyBp0gPWDQn25/aaus2q65f/7G6FalX\nZ9CLocCvnwoPYpXOduj9TRYfh2eBb3hZgyhuDNf5DMD7duzMEAsaBPGuPoAKorrF\nbx27CJIt97ZnJZ5pj34m1Gs0+WI9bE71ftRpxShKFQKBgQCnmjoBK3hQW3LJfvN2\n+DBue936BkhFJ6LohK76+wqHWKhj1SIMesZOD2FaPe3y02x4bplHr/+Uib9D0U1F\nMCyDH3vcDqKaUXVWYH4w6prgP2Rpo6jZ5Qi4CkwiKiq3bRWZ9gZOh8zaHMAbOvMB\nzfv1udUMeNcMmSIcUXnkQPXm6A==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/calendar'], // Full calendar access scope
        });

        // Initialize Google Calendar API
        const calendar = google.calendar({ version: 'v3', auth: jwtClient });

        // Define the calendar and event ID (replace with your actual calendar ID and event ID)
        const calendarId = 'c_de6a59ee297dd00115ded8690255602ffe6aa68f8579743bde8866d9ad2380cb@group.calendar.google.com';

        // Fetch the event from Google Calendar
        const response = await calendar.events.list({
            calendarId: calendarId,
            timeMin: '2024-09-22T22:54:58.486Z', // Fetch future events starting from now
            maxResults: 100, // Adjust the number of events as needed
            singleEvents: true, // Expand recurring events into individual instances
            orderBy: 'startTime', // Order events by start time
        });

        const res = await calendar.events.get({
            calendarId: calendarId,
            eventId: '631au8kc003j28ad9dh3tkgana',
        });

        // Return the event data in the response
        return NextResponse.json(res.data);
    } catch (error) {
        console.error('Error fetching calendar event:', error);
        return NextResponse.json({ error: 'Failed to fetch event details' }, { status: 500 });
    }
}