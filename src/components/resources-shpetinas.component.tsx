import Image1 from '@/../public/ricap-photo.jpg';

export default function ShpetinasResources () {
    return (
        <>
            <div className="flex flex-row bg-main text-white w-1/2 rounded-md p-5 gap-5 mx-auto my-5">
                <img src={Image1.src} alt="image" width={150} height={150}></img>
                <h1>RICAP hosts community forums, informational Immigration presentations, and Know-Your-Rights training on all Rutgers campuses.</h1>
            </div>
        </>
    );
}