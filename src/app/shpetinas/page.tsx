import ResourceComponent from '@/components/resources-shpetinas.component';
import EventsComponent from '@/components/events-shpetinas.component';

export default function Shpetinas () {
    return (
        <>
            <div className="bg-[#ffdbf8]">
                
                <EventsComponent />
                <ResourceComponent />
            </div>
        </>
    );
}