import Image from 'next/image';

export default function NavBar() {
    const pages = [
        {
            name: 'Home',
            id: 0
        }, {
            name: 'About Us',
            id: 1
        }, {
            name: 'Executive Board',
            id: 2
        }, {
            name: 'Events',
            id: 3
        }, {
            name: 'Corporate',
            id: 4
        }, {
            name: 'Contact Us',
            id: 5
        }
    ]
    return (
        <div className='bg-dark-main relative overflow-auto'>
            <div className="flex justify-center items-center my-4">
                <div className='relative h-20 w-20 shrink-0'>
                    <Image src="/she-logo.png" alt="she logo" fill={true}></Image>
                </div>
                <div className='mx-3 font-bold text-4xl shrink-0'>
                    <h1>Society of Hispanic Engineers</h1>
                </div>
            </div>
            <div className="flex justify-stretch items-center my-3">
                {
                pages.map( pageName => {
                    return (
                        <div className='flex grow shrink-0 px-2 justify-center font-semibold'
                        key={pageName.id}>
                            {pageName.name.toUpperCase()}
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
}