import EventImage1 from '@/../public/shpetinas/events/womens-day-2025.jpg';
import EventImage2 from '@/../public/shpetinas/events/shadow.png';

export default function ShpetinasEvents() {
    return (
        <>
            <div className="flex flex-col bg-[#ffdbf8] text-black p-4 mx-auto">
                <div className="flex flex-col bg-white rounded-3xl p-5 mb-5">
                    <h1 className="text-center font-bold tracking-wide text-5xl mx-auto my-auto">UPCOMING EVENTS</h1>
                </div>
                <ul className="flex flex-col gap-6 mx-8">
                    <li className="bg-white rounded-md shadow-md p-6">
                        <div className="flex flex-col w-full text-center items-center tracking-wide">
                            <div className="flex justify-center">
                                <img className="rounded-2xl" src={EventImage1.src} alt="event-img-1" width={500} height={500} />
                            </div>
                            <div className="text-center">
                                <h2 className="mt-5 mb-3 font-bold text-[#841f70] text-3xl">Women's Day at Douglass</h2>
                                <div className="text-xl">                                    
                                    <p><strong>Date:</strong> March 6th</p>
                                    <p><strong>Location:</strong> Kathleen W. Ludwig Global Village Living Learning (Jameson Complex)</p>
                                    <p><strong>Time:</strong> 12pm - 3pm</p>
                                </div>
                                <div className="mt-5 text-lg">
                                    <p> <strong>Celebrate international womanhood!</strong><br />
                                        The annual Women’s Day at Douglass, presented by the Douglass Diversity, Equity, and Inclusion Program, 
                                        will highlight the accomplishments of Douglass students, alumnae, and women within the Rutgers community. 
                                        Women’s Day at Douglass will include messages from special 
                                        guests, activities, prizes, food, and more.
                                    </p>
                                </div>
                            </div>                      
                        </div>
                    </li>

                    <li className="bg-white rounded-md shadow-md p-6">
                        <div className="flex flex-col w-full text-center items-center tracking-wide">
                            <div className="flex justify-center">
                                <img className="rounded-2xl" src={EventImage2.src} alt="event-img-2" width={500} height={500} />
                            </div>
                            <div className="text-center">
                                <h2 className="mt-5 mb-3 font-bold text-[#841f70] text-3xl">Spring Shadow Program</h2>
                                <div className="text-xl">   
                                    <p><strong>Dates: </strong> April 10th - 12th</p>
                                    <p><strong>Location: </strong> Busch Campus</p>
                                    <p><strong>Arrival Time:</strong> 5:30pm - 6:30pm (April 10)</p>     
                                    <p><strong>Departure Time:</strong> 3:30pm - 4:30pm (April 12)</p>                                 
                                </div>
                                <div className="mt-5 text-lg">
                                    <p> This Shadow Program will be the host of professional companies and several student organizations that will 
                                        provide all the resources for the students that attend. <br/>
                                        The Shadow Program seeks young students in their <b>Sophomore, Junior, and Senior</b> years that are eager to grow as individuals, develop 
                                        themselves professionally and are highly motivated to inspire others by example. A short essay question is also required.<br/>
                                        Click this <a className="underline text-blue-700" href="https://docs.google.com/forms/d/e/1FAIpQLSeVXa2dN-avDarHCv_P5GWBslzYhL5i71vaLQCnFNt2CfmtfQ/viewform">link</a> to fill out the application form, which is due <b>February 24th</b>.
                                    </p>
                                </div>
                            </div>                      
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
