import graphicTeach from '@/../public/info-pages/communication-graphics-teaching.png';
import graphicDoc from '@/../public/info-pages/writing-graphics-ids.png';
import graphicCollab from '@/../public/info-pages/writing-graphics-collab.png';
import graphicOneOnOne from '@/../public/info-pages/communication-one-on-one.png';

export default function ProfessionalInfo() {
    return (
        <section className="bg-white text-black flex flex-col items-center p-10 gap-7 text-xl text-center">
            <h1 className="text-4xl font-bold tracking-wider">Resume/ CV Building</h1>
            <div className="flex flex-col items-center">
              <img src={graphicDoc.src} className="size-32"></img>
              <img src={graphicCollab.src}></img>
            </div>
            <p>We offer assistance with building and editing our members resumes and cover letters.<br/><br/>
            Having a strong resume and cover letter is crucial in earning your first internship/job.</p>
            <h1 className="text-4xl font-bold tracking-wider">Professional & Leadership Workshops</h1>
            <p>SHE hosts at least one Professional and Leadership Workshops every month.<br/><br/></p>
            <img src={graphicTeach.src} className="size-60"></img>
            <p>In addition, we encourage our members to join committees within our Executive Board positions in order to gain professional and leadership experience.<br/>
            These experience are great resume builders and is an effective way in increasing participation within our club.</p>
            <h1 className="text-4xl font-bold tracking-wider">Professional Advising</h1>
            <img src={graphicOneOnOne.src} className="size-60"></img>
            <p>We have several experienced members and connections that are willing to give you
            honect advising base on their experience</p>
        </section>
    );
}