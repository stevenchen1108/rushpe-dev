import ResourceImage1 from '@/../public/shpetinas/resources/ricap.jpg';
import ResourceImage2 from '@/../public/shpetinas/resources/hesaa.jpg';
import ResourceImage3 from '@/../public/shpetinas/resources/owh.jpg';

export default function ShpetinasResources () {
    return (
        <>
            <div className="flex flex-col bg-[#ffdbf8] text-black p-4 mx-auto">
                <div className="flex flex-col bg-white rounded-3xl p-5 mb-5 lg:mx-80 md:mx-8 sm:mx-0">
                    <h1 className="text-center font-bold tracking-wide text-5xl mx-auto my-auto">RESOURCES</h1>
                </div>

                <div className="flex flex-col bg-white rounded-md text-black mb-8 xl:mx-56 lg:mx-48 md:mx-16 sm:mx-8">
                    <ul className="flex flex-col list-none text-left shadow-md">
                        
                        <li className="flex flex-col bg-[#ffa6a6] rounded-md mt-7 p-6" style={{minHeight: "300px"}}>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center px-8 py-6 w-full lg:space-x-4">
                                <img className="rounded-2xl mx-auto sm:w-8 md:w-32 lg:w-56 md:mr-5 mb-4 md:mb-0" src={ResourceImage1.src} alt="event-img-1"/>
                                <div className="text-center flex-grow max-w-[90%] md:max-w-[60%]">
                                    <h2 className="font-bold text-black text-5xl">RICAP</h2>
                                    <h1 className="text-3xl font-semibold">Rutgers Immigrant Community Assistance Project</h1>
                                </div>
                            </div>

                            <div className="text-left text-2xl mt-3 mb-3">
                                <p> <a className="underline text-blue-700 font-bold" href="https://law.rutgers.edu/information-for/get-legal-help/rutgers-immigrant-community-assistance-project">
                                    RICAP</a> strives to foster a safe environment on campus and to remove barriers to student success by <strong>providing immigration legal services</strong>.
                                    They host community forums, informational Immigration presentations, and Know-Your-Rights training on all Rutgers campuses. <br/>
                                </p>
                                <p className="mt-3 mb-3">If you're seeking an appointment or have general questions, please contact RICAP:</p>
                                <ul className="list-disc list-inside pl-4">
                                    <li><strong>Request an Appointment</strong> with Immigration Attorney Jason Hernandez by emailing 
                                        <a className="underline text-blue-700 font-bold ml-1" href="mailto:mary.hewey@rutgers.edu">Mary Hewey</a>, the RICAP Paralegal.
                                        All consultations are confidential and at no cost.
                                    </li>
                                    <li><strong>General Inquiries: </strong><a className="underline text-blue-700 font-bold" href="mailto:RICAP-Info@law.rutgers.edu">RICAP-Info@law.rutgers.edu</a></li>
                                    <li><strong>Phone: </strong>(856) 225-2302</li>
                                </ul>
                            </div>

                        </li>  
                        
                        <li className="flex flex-col bg-[#ffc7a6] rounded-md mt-7" style={{minHeight: "300px"}}>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center px-8 py-6 w-full lg:space-x-4">
                                <img className="rounded-2xl mx-auto sm:w-8 md:w-32 lg:w-56 md:mr-5 mb-4 md:mb-0" src={ResourceImage2.src} alt="event-img-2"/>
                                <div className="text-center flex-grow max-w-[90%] md:max-w-[60%]">
                                    <h2 className="font-bold text-black text-5xl">HESAA</h2>
                                    <h1 className="text-3xl font-semibold">Higher Education Student Assistance Authority</h1>
                                </div>
                            </div>
                            
                            <div className="text-left text-2xl px-4 mt-3 mb-3">
                                <p> <a className="underline text-blue-700 font-bold" href="https://www.hesaa.org/Pages/aboutus.aspx">
                                    HESAA</a> is the only New Jersey state agency with the soles mission of providing students and families with <strong>financial and informational resources</strong> for students to pursue their education beyond high school.
                                </p>
                                <p className="mt-3"> They are currently offering the New Jersey Alternative Financial Aid Application for <strong>NJ Dreamers</strong>, 
                                or NJ undocumented students who are eligible for financial aid.
                                Click this <a className="underline text-blue-700 font-bold" href="https://www.hesaa.org/pages/njalternativeapplication.aspx">link</a> to determine your elegibility and apply today!
                                </p>                                
                            </div>

                        </li> 
                        
                        <li className="flex flex-col bg-[#ffeca6] rounded-md mt-7 mb-7" style={{minHeight: "300px"}}>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center px-8 py-6 w-full lg:space-x-4">
                                <img className="rounded-2xl mx-auto sm:w-8 md:w-32 lg:w-56 md:mr-5 mb-4 md:mb-0" src={ResourceImage3.src} alt="event-img-3"/>
                                <div className="text-center flex-grow max-w-[90%] md:max-w-[60%]">
                                    <h2 className="font-bold text-black text-5xl">OWH</h2>
                                    <h1 className="text-3xl font-semibold">Office on Women's Health</h1>
                                </div>
                            </div>
                            
                            <div className="text-left text-2xl px-4 mt-3 mb-3">
                                <p> <a className="underline text-blue-700 font-bold" href="https://law.rutgers.edu/information-for/get-legal-help/rutgers-immigrant-community-assistance-project">
                                    OWH</a> coordinates women's health efforts and addresses critical women's health issues.
                                    They inform and advance policies, educate health care professionals and consumers, and support innovative programs. 
                                    Their goal is for <strong>all women and girls to achieve the best possible health</strong>.
                                </p>
                                <p className="mt-3">Learn more about them and the programs they provide at their website, linked <a className="underline text-blue-700 font-bold" href="https://womenshealth.gov/about-us/what-we-do">here</a>.</p>                           
                            </div>

                        </li> 
                          
                    </ul>
                </div>
            </div>
        </>
    );
}