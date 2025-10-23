import Academics from '@/components/academics.component';
import DonationsUpdater from '@/components/donations-updater.component';
import Events from '@/components/event-calendar.component';
import ImmigrantsRights from '@/app/estamos-aqui/immigrant';
import Networking from '@/components/networking.component';
import Professionalism from '@/components/professionalism.component';


export default function InfoPage( { params } : {
    params: { infoPage: string }
} ) {
    const linkMap: any = { professionalism: <Professionalism/>,
        academics: <Academics/>, networking: <Networking/>, events: <Events/>,
        'donations-updater': <DonationsUpdater/>, 'know-your-rights': <ImmigrantsRights /> };
    const linkPage: any = params.infoPage;
    return (
        <>
            {linkMap[linkPage]}
        </>
    );
}