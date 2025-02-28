export default function ProfessionalismInfo() {
    return (
        <section className="relative bg-white text-black flex flex-col items-stretch p-10 text-xl text-center">
            <h1 className="text-4xl font-bold tracking-wider">Scholarship Opportunity!</h1>
            <div>
                <p className="text-xs text-white">Put the fries in the bag</p>
                <p className="text-left text-lg font-semibold">MCDonald&apos;s HACER National Scholarship - </p>
                <p className="text-md">Awarded to 30 Hispanic students all over the country.<br/>Recipients are selected based on their academic achievement, community involvement, personal statement and financial need.
                    Must submit: <br/> <b>Transcript, Personal statement, Letter of recommendation to be submitted online, and  List of community service projects.</b></p>
            </div>
            <div className="flex flex-row flex-wrap w-full justify-center p-3">
                <div className="flex flex-col w-1/2">
                    <h1 className="text-4xl font-bold tracking-wider">Mentor/Mentee Program</h1>
                    <p>We offer our members an opportunity to take part in our Mentor/Mentee program.
                    In this program, we match our experienced upperclassmen with the younger class in order to aid in their scholarly, leadership and academic growth.<br/><br/>
                    In addition, this program is a great networking opportunity and a great place to make a friend within your field of studies.</p>
                </div>
                <div className="flex flex-col w-1/2">
                    <h1 className="text-4xl font-bold tracking-wider">Weekly Study Nights</h1>
                    <p>We offer our member weekly study nights, which is located at Richard Weeks.
                    We encourage you to take advantage of this opportunity and get studies in while bonding with our members.</p>
                </div>
                <div className="flex flex-col w-1/2">
                    <h1 className="text-4xl font-bold tracking-wider">Academic Advice Programs</h1>
                    <p>Every month we host events that is strictly done to teach our members things that normally are not covered in class.<br/><br/>
                    Events such as our Financial Literacy Workshop and Professionalism Panel are crucial to the success of our members in the future.</p>
                </div>
            </div>
        </section>
    );
}