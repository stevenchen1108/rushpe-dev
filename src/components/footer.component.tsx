import Image from 'next/image';

export default function FooterBar() {
    return (
        <>
            <footer className="bg-main flex flex-col sm:flex-row justify-around items-center px-14 py-3">
                <div className="relative h-32 w-32 shrink-0">
                    <Image src="/she-logo.png" alt="she logo" fill={true}></Image>
                </div>
                <div className="flex flex-col justify-between items-center text-center">
                    <div className="bg-dark-main p-8 rounded-full shadow-2 w-64 m-5">
                    rushpe@gmail.com
                    Meetings Tuesday @
                    600 Bartholomew Rd, Piscataway, NJ 08854
                    </div>
                    <p className="text-gray-600 text-xs">
                        Copyright © 2023, Rutgers SHPE, Society of Hispanic Engineers.
                    </p>
                </div>
            </footer>
        </>
    );
}