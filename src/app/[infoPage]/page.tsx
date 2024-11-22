import Professionalism from '@/components/professionalism.component';
import Academics from '@/components/academics.component';
import Networking from '@/components/networking.component';
import Events from '@/components/event-calendar.component';
import SMUpdater from '@/components/shenanometer-updater.component';


export default function InfoPage( { params } : {
    params: { infoPage: string }
} ) {
    const linkMap: any = { professionalism: <Professionalism/>, academics: <Academics/>, networking: <Networking/>, events: <Events/>, smupdater: <SMUpdater/> };
    const linkPage: any = params.infoPage;
    console.log(linkPage,  Object.keys(params), linkMap);
    return (
        <>
            {linkMap[linkPage]}
        </>
    );
}